// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0
import { UserTransactionResponse } from "@aptos-labs/ts-sdk";
import {
  AnyParser,
  ContextOfParsers,
  ValidateParsers,
} from "../../types/parsers";
import { getPairedMetadata } from "../fungibleAssets";
import {
  CoinEventParser,
  CoinEventParserProvides,
} from "./parsers/CoinEventParser";
import { CoinStoreWritesetParser } from "./parsers/CoinStoreWritesetParser";
import {
  FungibleAssetEventParser,
  FungibleAssetEventParserProvides,
} from "./parsers/FungibleAssetEventParser";
import { FungibleAssetStoreWritesetParser } from "./parsers/FungibleAssetStoreWritesetParser";
import { ObjectOwnersWritesetParser } from "./parsers/ObjectOwnersWritesetParser";

export default class TransactionParser<
  Parsers extends readonly AnyParser[] = readonly AnyParser[],
> {
  private readonly defaultContext: ContextOfParsers<Parsers>;

  /**
   * Creates a new TransactionParser with the given parsers and initial context. This parser takes a
   * transaction and parses it into a context which can be used to get balance changes
   *
   * @example
   * ```ts
   * const parser = new TransactionParser([
   *   new CoinStoreWritesetParser(),
   *   new CoinEventParser(),
   * ], {
   *   coinEventGuidToCoinType: {},
   *   coinBalanceChanges: {},
   * });
   * ```
   *
   * @param parsers - EventParsers and WritesetParsers to use to parse the transaction.
   * @param initial - Initial context to use for parsing.
   */
  constructor(
    public parsers: ValidateParsers<Parsers> & Parsers,
    initial: ContextOfParsers<Parsers>
  ) {
    this.defaultContext = initial;
  }

  parseTransaction(transaction: UserTransactionResponse) {
    const context = { ...this.defaultContext };

    const writesets = transaction.changes;

    writesets.forEach((writeset) => {
      for (const p of this.parsers) {
        if (p.kind === "writeset") {
          p.parse(context, writeset);
        }
      }
    });

    const events = transaction.events;
    events.forEach((event) => {
      for (const p of this.parsers) {
        if (p.kind === "event") {
          p.parse(context, event);
        }
      }
    });

    return context;
  }

  /**
   * Create a new TransactionParser with default event and writeset parsers.
   *
   * @example
   * ```ts
   * const parser = TransactionParser.create();
   * const context = parser.parseTransaction(transaction);
   * const balanceChanges = TransactionParser.getBalanceChanges(context);
   * ```
   */
  static create() {
    return new TransactionParser(
      [
        new ObjectOwnersWritesetParser(),
        new FungibleAssetStoreWritesetParser(),
        new FungibleAssetEventParser(),
        new CoinStoreWritesetParser(),
        new CoinEventParser(),
      ],
      {
        coinEventGuidToCoinType: {},
        coinBalanceChanges: {},
        fungibleAssetBalanceChanges: {},
        fungibleAssetStoreMetadata: {},
        objectOwners: {},
      }
    );
  }

  /**
   * Get the account balance changes for a given context. Assets will default to `CoinType` if
   * it exists for an asset, otherwise it will default to the metadata address of the fungible
   * asset store.
   */
  static getBalanceChanges(
    ctx: FungibleAssetEventParserProvides & CoinEventParserProvides
  ) {
    const balanceChanges: {
      [address: string]: {
        [asset: string]: {
          delta: bigint;
          coinType: string | undefined;
          faAddress: string;
        };
      };
    } = {};

    Object.entries(ctx.coinBalanceChanges).forEach(([address, changes]) =>
      Object.entries(changes).forEach(([coinType, delta]) => {
        if (!balanceChanges[address]) balanceChanges[address] = {};
        balanceChanges[address][coinType] = {
          delta,
          coinType,
          faAddress: getPairedMetadata(coinType),
        };
      })
    );

    Object.entries(ctx.fungibleAssetBalanceChanges).forEach(
      ([address, changes]) =>
        Object.entries(changes).forEach(([faAddress, delta]) => {
          // If the address doesn't have a balance change already, create one.
          if (!balanceChanges[address]) {
            return (balanceChanges[address] = {
              [faAddress]: {
                delta,
                faAddress,
                coinType: undefined,
              },
            });
          }

          // If the address already has a balance change for this fungible asset, add the delta to it.
          const pairedCoinBalanceChange = Object.entries(
            balanceChanges[address]
          ).find(([, change]) => change.faAddress === faAddress);

          if (pairedCoinBalanceChange) {
            const [coinType, change] = pairedCoinBalanceChange;
            balanceChanges[address][coinType] = {
              ...change,
              delta: change.delta + delta,
            };
          } else {
            balanceChanges[address][faAddress] = {
              delta,
              faAddress,
              coinType: undefined,
            };
          }
        })
    );

    return balanceChanges;
  }
}
