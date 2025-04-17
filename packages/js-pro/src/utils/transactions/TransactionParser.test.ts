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
        "coinBalanceChanges": {
          "0xb4026caa016eb59fc006c281ef72fc9aab1e17d7ec7fb92a20d2c4cefa5cf23f": {
            "0x1::aptos_coin::AptosCoin": 3584933233n,
          },
        },
        "coinEventGuidToCoinType": {
          "0xb4026caa016eb59fc006c281ef72fc9aab1e17d7ec7fb92a20d2c4cefa5cf23f_2": "0x1::aptos_coin::AptosCoin",
          "0xb4026caa016eb59fc006c281ef72fc9aab1e17d7ec7fb92a20d2c4cefa5cf23f_3": "0x1::aptos_coin::AptosCoin",
        },
        "fungibleAssetBalanceChanges": {
          "0x925660b8618394809f89f8002e2926600c775221f43bf1919782b297a79400d8": {
            "0x000000000000000000000000000000000000000000000000000000000000000a": -3584933233n,
            "0xbae207659db88bea0cbead6da0ed00aac12edcdda169e591cd41c94180b46f3b": 166683335n,
          },
          "0xb4026caa016eb59fc006c281ef72fc9aab1e17d7ec7fb92a20d2c4cefa5cf23f": {
            "0x000000000000000000000000000000000000000000000000000000000000000a": 0n,
            "0xbae207659db88bea0cbead6da0ed00aac12edcdda169e591cd41c94180b46f3b": -166683335n,
          },
        },
        "fungibleAssetStoreMetadata": {
          "0x0caf07c787f031bb0aadb4209ee9fc164ff6283cb52979a42aabb09176948da2": "0xbae207659db88bea0cbead6da0ed00aac12edcdda169e591cd41c94180b46f3b",
          "0x70d78ec115662462bf1bb20c758eca9c766c44e7ceee498dc5343a8789087339": "0x000000000000000000000000000000000000000000000000000000000000000a",
          "0xba753579ed3422277707f7aa165afd57aa604a401896263f8de8cea94f8411a0": "0xbae207659db88bea0cbead6da0ed00aac12edcdda169e591cd41c94180b46f3b",
          "0xc8e1580b47d35fb9ea9fa1cfdf772fc86d5456be79f084484083ab9c4789b713": "0xbae207659db88bea0cbead6da0ed00aac12edcdda169e591cd41c94180b46f3b",
          "0xe7730c38866f4c02ae528b26478462b395408f9d2c003fe8bb35727eaad197eb": "0x000000000000000000000000000000000000000000000000000000000000000a",
        },
        "objectOwners": {
          "0x000000000000000000000000000000000000000000000000000000000000000a": "0x0000000000000000000000000000000000000000000000000000000000000001",
          "0x0caf07c787f031bb0aadb4209ee9fc164ff6283cb52979a42aabb09176948da2": "0xb4026caa016eb59fc006c281ef72fc9aab1e17d7ec7fb92a20d2c4cefa5cf23f",
          "0x70d78ec115662462bf1bb20c758eca9c766c44e7ceee498dc5343a8789087339": "0xb4026caa016eb59fc006c281ef72fc9aab1e17d7ec7fb92a20d2c4cefa5cf23f",
          "0x925660b8618394809f89f8002e2926600c775221f43bf1919782b297a79400d8": "0x4ea3c7d6fd8ee6e752ca70420d4aac1fda379db4475520249faf8e04ad31c5a4",
          "0xba753579ed3422277707f7aa165afd57aa604a401896263f8de8cea94f8411a0": "0x925660b8618394809f89f8002e2926600c775221f43bf1919782b297a79400d8",
          "0xc8e1580b47d35fb9ea9fa1cfdf772fc86d5456be79f084484083ab9c4789b713": "0x925660b8618394809f89f8002e2926600c775221f43bf1919782b297a79400d8",
          "0xe7730c38866f4c02ae528b26478462b395408f9d2c003fe8bb35727eaad197eb": "0x925660b8618394809f89f8002e2926600c775221f43bf1919782b297a79400d8",
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
      TransactionParser.create().parseTransaction(transaction)
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
