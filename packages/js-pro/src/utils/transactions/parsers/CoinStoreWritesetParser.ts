// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0
import type { WriteSetChange } from "@aptos-labs/ts-sdk";
import { isWriteResourceChange, serializeEventGuid } from "../shared";
import { WritesetParser } from "../../../types/parsers";

/**
 * Parser for mapping a coin event guid to its coin type.
 * Useful for linking coin events to their coin type and computing the balance change.
 *
 * When a coin store is created on chain, two new event streams are assigned to the owner account
 * for that coin's deposit and withdrawal events respectively.
 *
 * If a coin balance changes, there will be a writeset change associated to the change
 * and by parsing it, we can map the event stream guids to the coin type of the coin store.
 */
export class CoinStoreWritesetParser extends WritesetParser<
  object,
  { coinEventGuidToCoinType: { [eventGuid: string]: string } }
> {
  override parse(
    ctx: object & {
      coinEventGuidToCoinType: { [eventGuid: string]: string };
    },
    change: WriteSetChange,
  ): void {
    if (!isWriteResourceChange(change)) return;

    const resource = change.data;

    const coinType = resource.type.match(
      new RegExp(`^0x1::coin::CoinStore<(.+)>$`),
    )?.[1];

    if (!coinType) return;

    const coinResourceData = resource.data as {
      coin: { value: string };
      deposit_events: {
        counter: string;
        guid: { id: { addr: string; creation_num: string } };
      };
      frozen: boolean;
      withdraw_events: {
        counter: string;
        guid: { id: { addr: string; creation_num: string } };
      };
    };

    const depositEventGuid = serializeEventGuid(
      coinResourceData.deposit_events.guid.id.addr,
      coinResourceData.deposit_events.guid.id.creation_num,
    );
    const withdrawEventGuid = serializeEventGuid(
      coinResourceData.withdraw_events.guid.id.addr,
      coinResourceData.withdraw_events.guid.id.creation_num,
    );

    ctx.coinEventGuidToCoinType[depositEventGuid] = coinType;
    ctx.coinEventGuidToCoinType[withdrawEventGuid] = coinType;
  }
}
