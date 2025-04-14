import type { Event } from "@aptos-labs/ts-sdk";
import { normalizeAddress } from "../shared";
import { EventParser } from "../../../types/parsers";

export type FungibleAssetEventParserRequiredContext = {
  fungibleAssetStoreMetadata: { [storeAddress: string]: string };
  objectOwners: { [objectAddress: string]: string };
};

export type FungibleAssetEventParserProvides = {
  fungibleAssetBalanceChanges: {
    [accountAddress: string]: { [assetAddress: string]: bigint };
  };
};

export class FungibleAssetEventParser extends EventParser<
  FungibleAssetEventParserRequiredContext,
  FungibleAssetEventParserProvides
> {
  private applyChange(
    context: FungibleAssetEventParserRequiredContext &
      FungibleAssetEventParserProvides,
    storeAddress: string,
    amount: bigint
  ) {
    const ownerAddress = context.objectOwners[storeAddress];
    const assetAddress = context.fungibleAssetStoreMetadata[storeAddress];

    if (ownerAddress === undefined || assetAddress === undefined) {
      // This should never really happen, as changing the balance will produce
      // a writeset change including the fungible store's owner and asset.
      return;
    }

    const accountAssetChanges =
      context.fungibleAssetBalanceChanges[ownerAddress] ?? {};

    if (!accountAssetChanges[assetAddress]) {
      accountAssetChanges[assetAddress] = amount;
    } else {
      accountAssetChanges[assetAddress] += amount;
    }

    context.fungibleAssetBalanceChanges[ownerAddress] = accountAssetChanges;
  }

  override parse(
    context: FungibleAssetEventParserRequiredContext &
      FungibleAssetEventParserProvides,
    event: Event
  ) {
    switch (event.type) {
      case '0x1::fungible_asset::Deposit': {
        this.applyChange(
          context,
          normalizeAddress(event.data.store),
          BigInt(event.data.amount)
        );
        return true;
      }
      case '0x1::fungible_asset::Withdraw': {
        this.applyChange(
          context,
          normalizeAddress(event.data.store),
          -BigInt(event.data.amount)
        );
        return true;
      }
      default:
        return false;
    }
  }
}
