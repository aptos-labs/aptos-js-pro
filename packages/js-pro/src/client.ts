// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { subscribeWithSelector } from "zustand/middleware";
import { createStore, Mutate, StoreApi } from "zustand/vanilla";
import {
  Aptos,
  AptosApiType,
  AptosConfig,
  AptosSettings,
  Network,
} from "@aptos-labs/ts-sdk";
import { GraphQLClient } from "graphql-request";
import { Sdk, createIndexerClient } from "./operations/index.js";
import { AccountInfo, NetworkInfo, SignerClient } from "./types/index.js";
import {
  getClients,
  fetchAccountCoins,
  fetchAptBalance,
  fetchBalance,
  fetchProcessorStatus,
  fetchAddressFromName,
  fetchNameFromAddress,
  fetchEstimatedGasPrice,
  fetchTransaction,
  fetchResources,
  fetchResourceType,
  fetchTokenData,
  fetchFungibleAssetMetadata,
  fetchAccountCollections,
  fetchViewModule,
  fetchLedgerInfo,
} from "./queries/index.js";
import {
  buildTransaction,
  signAndSubmitTransaction,
  signTransaction,
  simulateTransaction,
  submitTransaction,
  waitForTransaction,
} from "./mutations/index.js";
import { fetchAccountTokens } from "./queries/fetchAccountTokens.js";
import { fetchAccountTransactions } from "./queries/fetchAccountTransactions.js";

type IndexerClientOptions = ConstructorParameters<typeof GraphQLClient>[1];

export type ClientConfigs = {
  /**
   * This will be included as `Authorization: Bearer <apiKey> in all requests to Aptos
   * APIs. For the Aptos client this means settings AptosConfig.clientConfig.API_KEY.
   * For the indexer client, we provide a custom header.
   *
   * This argument takes precedence over the relevant argument in the configs for
   * `aptos` and `indexerClient`.
   *
   * It is okay to accept a single argument here because it is standard to use the same
   * API key for both APIs (node and indexer APIs).
   */
  apiKey?: string;
  /**
   * Will override any Network settings if provided in this config.
   */
  aptos?: { config: AptosSettings };
  indexerClient?: { options: IndexerClientOptions };
  /**
   * A function that returns the current server time in milliseconds.
   *
   * @default Date.now
   * @returns The current server time in milliseconds
   */
  serverTime?: () => number;
};

export type AptosJSProClientParameters = {
  account?: AccountInfo;
  config?: ClientConfigs;
  network: NetworkInfo;
  signer?: SignerClient;
};

export type AptosJSProClientState = {
  account?: AccountInfo;
  config?: ClientConfigs;
  network: NetworkInfo;
  signer?: SignerClient;
};

export class AptosJSProClient {
  #store: Mutate<
    StoreApi<AptosJSProClientState>,
    [["zustand/subscribeWithSelector", never]]
  >;

  #aptos: Aptos;

  #indexer: Sdk | undefined;

  constructor(params: AptosJSProClientParameters) {
    this.#store = createStore<
      AptosJSProClientState,
      [["zustand/subscribeWithSelector", never]]
    >(
      subscribeWithSelector(
        (): AptosJSProClientState => ({
          account: params.account,
          config: params.config,
          network: params.network,
          signer: params.signer,
        })
      )
    );
    this.#aptos = this.createAptos();
    this.#indexer = this.createIndexer();
  }

  get state() {
    return this.#store.getState();
  }

  get store() {
    return this.#store;
  }

  get signer() {
    return this.state.signer;
  }

  get account() {
    return this.state.account;
  }

  get network() {
    return this.state.network;
  }

  get aptos() {
    return this.#aptos;
  }

  get indexer() {
    return this.#indexer;
  }

  getServerTime = () => (this.state.config?.serverTime ?? Date.now)();

  getServerDate = () => new Date(this.getServerTime());

  setAccount = (account: AccountInfo | undefined) => {
    this.#store.setState({ ...this.state, account }, true);
  };

  setNetwork = (network: NetworkInfo) => {
    this.#store.setState({ ...this.state, network }, true);
    this.refreshClients();
  };

  setSigner = (signer: SignerClient | undefined) => {
    this.#store.setState({ ...this.state, signer }, true);
  };

  setConfig = (config: ClientConfigs) => {
    this.#store.setState({ ...this.state, config }, true);
    this.refreshClients();
  };

  onAccountChange = (callback: (account?: AccountInfo) => void) =>
    this.#store.subscribe(
      (state) => state.account,
      (account) => callback(account)
    );

  onNetworkChange = (callback: (network: NetworkInfo) => void) =>
    this.#store.subscribe(
      (state) => state.network,
      (network) => callback(network)
    );

  onSignerChange = (callback: (signer?: SignerClient) => void) =>
    this.#store.subscribe(
      (state) => state.signer,
      (signer) => callback(signer)
    );

  onConfigChange = (callback: (config?: ClientConfigs) => void) =>
    this.#store.subscribe(
      (state) => state.config,
      (config) => callback(config)
    );

  onChange = (callback: (state: AptosJSProClientState) => void) =>
    this.#store.subscribe((state) => callback(state));

  createNetworkConfig = (
    network: NetworkInfo = this.state.network
  ): AptosSettings => {
    if (network.network === Network.CUSTOM) {
      return {
        network: network.network,
        fullnode: network.nodeUrl,
        indexer: network.indexerUrl,
        faucet: network.faucetUrl,
        prover: network.proverUrl,
        pepper: network.pepperUrl,
      };
    }
    return network;
  };

  /**
   * To support V1 networks, we are case insensitive when matching the network name.
   *
   * @returns An Aptos instance
   */
  createAptos = (
    clientConfig?: AptosSettings,
    network: NetworkInfo = this.state.network
  ) => {
    const { state } = this;

    const networkConfig = this.createNetworkConfig(network);

    const userProvidedConfig = state.config?.aptos?.config ?? {};

    // Deep merge clientConfig over userProvidedConfig
    // 1. Add default networks config
    // 2. Add default state config and API_KEY
    // 3. Add clientConfig (if provided) which can
    //    override the state config, API_KEY, or networks
    const aptosConfig = new AptosConfig({
      ...networkConfig,
      ...userProvidedConfig,
      ...clientConfig,
      clientConfig: {
        ...userProvidedConfig.clientConfig,
        API_KEY: state.config?.apiKey,
        ...clientConfig?.clientConfig,
      },
    });

    return new Aptos(aptosConfig);
  };

  createIndexer = (
    clientConfig?: AptosSettings,
    network: NetworkInfo = this.state.network
  ): Sdk | undefined => {
    const indexerUrl = this.createAptos(
      clientConfig,
      network
    ).config.getRequestUrl(AptosApiType.INDEXER);

    if (indexerUrl === undefined) return undefined;

    const userProvidedOptions = this.state.config?.indexerClient?.options ?? {};
    const authHeaders: Record<string, string> = this.state?.config?.apiKey
      ? { Authorization: `Bearer ${this.state.config.apiKey}` }
      : {};
    const options = {
      ...userProvidedOptions,
      headers: {
        ...userProvidedOptions.headers,
        ...authHeaders,
      },
    };
    return createIndexerClient(indexerUrl, options);
  };

  private refreshClients = () => {
    this.#aptos = this.createAptos();
    this.#indexer = this.createIndexer();
  };

  //* Client Queries

  getClients = getClients;

  fetchAccountTransactions = fetchAccountTransactions;

  fetchAccountCollections = fetchAccountCollections;

  fetchAccountCoins = fetchAccountCoins;

  fetchAccountTokens = fetchAccountTokens;

  fetchTransaction = fetchTransaction;

  fetchResources = fetchResources;

  fetchResourceType = fetchResourceType;

  fetchProcessorStatus = fetchProcessorStatus;

  fetchTokenData = fetchTokenData;

  fetchFungibleAssetMetadata = fetchFungibleAssetMetadata;

  fetchLedgerInfo = fetchLedgerInfo;

  fetchAddressFromName = fetchAddressFromName;

  fetchNameFromAddress = fetchNameFromAddress;

  fetchAptBalance = fetchAptBalance;

  fetchBalance = fetchBalance;

  fetchEstimatedGasPrice = fetchEstimatedGasPrice;

  fetchViewModule = fetchViewModule;

  //* Client Mutations

  submitTransaction = submitTransaction;

  waitForTransaction = waitForTransaction;

  simulateTransaction = simulateTransaction;

  signTransaction = signTransaction;

  signAndSubmitTransaction = signAndSubmitTransaction;

  buildTransaction = buildTransaction;
}
