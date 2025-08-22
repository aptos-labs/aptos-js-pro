// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0
import { describe, expect } from "vitest";
import { test } from "../../../tests/fixtures";
import TransactionParser from "./TransactionParser";
import { TransactionResponseType } from "@aptos-labs/ts-sdk";

describe("TransactionParser", () => {
  test("should parse a transaction", async ({ mainnet }) => {
    const transaction = await mainnet.fetchTransaction({
      ledgerVersion: 2617328349,
    });

    if (transaction.type !== TransactionResponseType.User) {
      throw new Error("Transaction is not a user transaction");
    }

    const result = TransactionParser.create().parseTransaction(transaction);

    expect(result).toMatchInlineSnapshot(`
      {
        "coinBalanceChanges": {
          "0xbd03f6ccb723a48d7ad7329918e400060f029c613ab9365534684be6b5b514dc": {
            "0x1::aptos_coin::AptosCoin": -100000n,
          },
          "0xf008a23b120630ee8503ef4f7e7cf51f84da0858f332d889287f4983fdfdfb4a": {
            "0x1::aptos_coin::AptosCoin": 100000n,
          },
        },
        "coinEventGuidToCoinType": {
          "0xbd03f6ccb723a48d7ad7329918e400060f029c613ab9365534684be6b5b514dc_2": "0x1::aptos_coin::AptosCoin",
          "0xbd03f6ccb723a48d7ad7329918e400060f029c613ab9365534684be6b5b514dc_3": "0x1::aptos_coin::AptosCoin",
          "0xf008a23b120630ee8503ef4f7e7cf51f84da0858f332d889287f4983fdfdfb4a_2": "0x1::aptos_coin::AptosCoin",
          "0xf008a23b120630ee8503ef4f7e7cf51f84da0858f332d889287f4983fdfdfb4a_3": "0x1::aptos_coin::AptosCoin",
        },
        "fungibleAssetBalanceChanges": {},
        "fungibleAssetStoreMetadata": {},
        "objectOwners": {},
      }
    `);
  });

  test("should parse a transaction with fungible asset changes", async ({
    mainnet,
  }) => {
    const transaction = await mainnet.fetchTransaction({
      ledgerVersion: 2617328168,
    });

    if (transaction.type !== TransactionResponseType.User) {
      throw new Error("Transaction is not a user transaction");
    }

    const result = TransactionParser.create().parseTransaction(transaction);

    expect(result.coinBalanceChanges).toMatchInlineSnapshot(`
      {
        "0xb4026caa016eb59fc006c281ef72fc9aab1e17d7ec7fb92a20d2c4cefa5cf23f": {
          "0x1::aptos_coin::AptosCoin": 3584933233n,
        },
      }
    `);

    expect(result.fungibleAssetBalanceChanges).toMatchInlineSnapshot(`
      {
        "0x925660b8618394809f89f8002e2926600c775221f43bf1919782b297a79400d8": {
          "0x000000000000000000000000000000000000000000000000000000000000000a": -3584933233n,
          "0xbae207659db88bea0cbead6da0ed00aac12edcdda169e591cd41c94180b46f3b": 166683335n,
        },
        "0xb4026caa016eb59fc006c281ef72fc9aab1e17d7ec7fb92a20d2c4cefa5cf23f": {
          "0x000000000000000000000000000000000000000000000000000000000000000a": 0n,
          "0xbae207659db88bea0cbead6da0ed00aac12edcdda169e591cd41c94180b46f3b": -166683335n,
        },
      }
    `);
  });

  test("should parse a transaction for coin balance changes", async ({
    mainnet,
  }) => {
    const transaction = await mainnet.fetchTransaction({
      ledgerVersion: 2617328168,
    });

    if (transaction.type !== TransactionResponseType.User) {
      throw new Error("Transaction is not a user transaction");
    }

    const result = TransactionParser.getBalanceChanges(
      TransactionParser.create().parseTransaction(transaction),
    );

    expect(result).toMatchInlineSnapshot(`
      {
        "0x925660b8618394809f89f8002e2926600c775221f43bf1919782b297a79400d8": {
          "0x000000000000000000000000000000000000000000000000000000000000000a": {
            "coinType": undefined,
            "delta": -3584933233n,
            "faAddress": "0x000000000000000000000000000000000000000000000000000000000000000a",
          },
          "0xbae207659db88bea0cbead6da0ed00aac12edcdda169e591cd41c94180b46f3b": {
            "coinType": undefined,
            "delta": 166683335n,
            "faAddress": "0xbae207659db88bea0cbead6da0ed00aac12edcdda169e591cd41c94180b46f3b",
          },
        },
        "0xb4026caa016eb59fc006c281ef72fc9aab1e17d7ec7fb92a20d2c4cefa5cf23f": {
          "0x1::aptos_coin::AptosCoin": {
            "coinType": "0x1::aptos_coin::AptosCoin",
            "delta": 3584933233n,
            "faAddress": "0x000000000000000000000000000000000000000000000000000000000000000a",
          },
          "0xbae207659db88bea0cbead6da0ed00aac12edcdda169e591cd41c94180b46f3b": {
            "coinType": undefined,
            "delta": -166683335n,
            "faAddress": "0xbae207659db88bea0cbead6da0ed00aac12edcdda169e591cd41c94180b46f3b",
          },
        },
      }
    `);
  });
});
