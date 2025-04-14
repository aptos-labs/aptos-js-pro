import { AccountAddress, createObjectAddress } from "@aptos-labs/ts-sdk";
import { createUserDerivedObjectAddress } from "./objects.js";

/**
 * Returns the paired Fungible Asset metadata paired for a given coin type. If the
 * coin type is Aptos Coin, it will return a special address for the metadata.
 *
 * @param coinType - The coin type (e.g. 0x1::aptos_coin::AptosCoin, 0x31::moon_coin::MoonCoin)
 * @returns The paired metadata address for the given coin type
 */
export const getPairedMetadata = (coinType: string) =>
  coinType === "0x1::aptos_coin::AptosCoin"
    ? AccountAddress.A.toStringLong()
    : createObjectAddress(AccountAddress.A, coinType).toStringLong();

/**
 * Returns the associated fungible asset store for a given metadata and account address.
 *
 * @param metadata - The metadata address (e.g. 0xfa)
 * @param accountAddress - The account address
 * @returns The associated fungible asset store address
 */
export const getPrimaryFungibleStore = (
  accountAddress: string,
  metadata: string
) =>
  createUserDerivedObjectAddress(
    AccountAddress.fromString(accountAddress),
    metadata
  ).toStringLong();
