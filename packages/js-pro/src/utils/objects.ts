import {
  AccountAddress,
  AccountAddressInput,
  DeriveScheme,
} from "@aptos-labs/ts-sdk";
import { sha3_256 } from "@noble/hashes/sha3";

/**
 * Deterministically derives an object address from the source address and
 * an object: sha3_256([source | object addr | 0xFC]).
 *
 * Equivalent of `object::create_user_derived_object_address` in move.
 *
 * @param source - The source address
 * @param object - The object address
 * @returns The derived object address
 */
export const createUserDerivedObjectAddress = (
  source: AccountAddressInput,
  object: AccountAddressInput
): AccountAddress => {
  const sourceBytes = AccountAddress.from(source).bcsToBytes();

  const objectBytes = AccountAddress.from(object).bcsToBytes();

  const bytes = new Uint8Array([
    ...sourceBytes,
    ...objectBytes,
    DeriveScheme.DeriveObjectAddressFromObject,
  ]);

  return new AccountAddress(sha3_256(bytes));
};
