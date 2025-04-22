// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0
import type { Event } from "@aptos-labs/ts-sdk";
import { normalizeAddress, serializeEventGuid } from "../shared";
import { EventParser } from "../../../types/parsers";

export type CoinEventParserRequiredContext = {
  coinEventGuidToCoinType: { [eventGuid: string]: string };
};

export type CoinEventParserProvides = {
  coinBalanceChanges: {
    [accountAddress: string]: { [coinType: string]: bigint };
  };
};

export class CoinEventParser extends EventParser<
  CoinEventParserRequiredContext,
  CoinEventParserProvides
> {
  private applyChange(
    context: {
      coinEventGuidToCoinType: { [eventGuid: string]: string };
      coinBalanceChanges: {
        [accountAddress: string]: { [coinType: string]: bigint };
      };
    },
    accountAddress: string,
    amount: bigint,
    opts: { creationNum: string } | { coinType: string }
  ) {
    let coinType: string;
    if ("creationNum" in opts) {
      const eventGuid = serializeEventGuid(accountAddress, opts.creationNum);
      if (!context.coinEventGuidToCoinType[eventGuid]) return;
      coinType = context.coinEventGuidToCoinType[eventGuid];
    } else {
      coinType = opts.coinType;
    }

    const coinBalanceChanges = context.coinBalanceChanges[accountAddress] ?? {};

    if (!coinBalanceChanges[coinType]) {
      coinBalanceChanges[coinType] = amount;
    } else {
      coinBalanceChanges[coinType]! += amount;
    }

    context.coinBalanceChanges[accountAddress] = coinBalanceChanges;
  }

  override parse(
    ctx: {
      coinEventGuidToCoinType: { [eventGuid: string]: string };
      coinBalanceChanges: {
        [accountAddress: string]: { [coinType: string]: bigint };
      };
    },
    event: Event
  ) {
    switch (event.type) {
      case "0x1::coin::DepositEvent": {
        const accountAddress = normalizeAddress(event.guid.account_address);
        this.applyChange(ctx, accountAddress, BigInt(event.data.amount), {
          creationNum: event.guid.creation_number,
        });
        return true;
      }
      case "0x1::coin::WithdrawEvent": {
        const accountAddress = normalizeAddress(event.guid.account_address);
        this.applyChange(ctx, accountAddress, -BigInt(event.data.amount), {
          creationNum: event.guid.creation_number,
        });
        return true;
      }
      case "0x1::coin::CoinDeposit": {
        const accountAddress = normalizeAddress(event.data.account);
        this.applyChange(ctx, accountAddress, BigInt(event.data.amount), {
          coinType: event.data.coin_type,
        });
        return true;
      }
      case "0x1::coin::CoinWithdraw": {
        const accountAddress = normalizeAddress(event.data.account);
        this.applyChange(ctx, accountAddress, -BigInt(event.data.amount), {
          coinType: event.data.coin_type,
        });
        return true;
      }
      default:
        return false;
    }
  }
}
