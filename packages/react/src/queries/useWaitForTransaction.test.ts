// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { renderHook, waitFor } from "../../tests/utils";
import { useWaitForTransaction } from "./useWaitForTransaction";
import { test } from "../../tests/fixtures";
import { expect } from "vitest";

const ARCHIVE_MAINNET_FULLNODE = "https://archive.mainnet.aptoslabs.com/v1";

test("useWaitForTransaction", async ({ mainnet }) => {
  mainnet.setConfig({
    ...mainnet.state.config,
    aptos: { config: { fullnode: ARCHIVE_MAINNET_FULLNODE } },
  });
  const { result } = renderHook(mainnet, () =>
    useWaitForTransaction({
      hash: "0xf0f67d76af475864eec20f4243f8284f6d1cd1236c6704788f6a24464264d00c",
    }),
  );

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

  expect(result.current.data).toMatchInlineSnapshot(`
    {
      "accumulator_root_hash": "0x113da5ca52ea764d00c54977cdd97f11afbb8febaf156852c7e23201c3b9c98f",
      "changes": [
        {
          "address": "0xbd03f6ccb723a48d7ad7329918e400060f029c613ab9365534684be6b5b514dc",
          "data": {
            "data": {
              "coin": {
                "value": "377302800",
              },
              "deposit_events": {
                "counter": "100069",
                "guid": {
                  "id": {
                    "addr": "0xbd03f6ccb723a48d7ad7329918e400060f029c613ab9365534684be6b5b514dc",
                    "creation_num": "2",
                  },
                },
              },
              "frozen": false,
              "withdraw_events": {
                "counter": "107203",
                "guid": {
                  "id": {
                    "addr": "0xbd03f6ccb723a48d7ad7329918e400060f029c613ab9365534684be6b5b514dc",
                    "creation_num": "3",
                  },
                },
              },
            },
            "type": "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>",
          },
          "state_key_hash": "0x8ed999a98e464ae1ec13123cb878c63a71989239f2aefbd7661e4900cb05e76c",
          "type": "write_resource",
        },
        {
          "address": "0xbd03f6ccb723a48d7ad7329918e400060f029c613ab9365534684be6b5b514dc",
          "data": {
            "data": {
              "authentication_key": "0xbd03f6ccb723a48d7ad7329918e400060f029c613ab9365534684be6b5b514dc",
              "coin_register_events": {
                "counter": "5",
                "guid": {
                  "id": {
                    "addr": "0xbd03f6ccb723a48d7ad7329918e400060f029c613ab9365534684be6b5b514dc",
                    "creation_num": "0",
                  },
                },
              },
              "guid_creation_num": "12",
              "key_rotation_events": {
                "counter": "0",
                "guid": {
                  "id": {
                    "addr": "0xbd03f6ccb723a48d7ad7329918e400060f029c613ab9365534684be6b5b514dc",
                    "creation_num": "1",
                  },
                },
              },
              "rotation_capability_offer": {
                "for": {
                  "vec": [],
                },
              },
              "sequence_number": "213544",
              "signer_capability_offer": {
                "for": {
                  "vec": [],
                },
              },
            },
            "type": "0x1::account::Account",
          },
          "state_key_hash": "0xa7cb4fad2c34f52ff426c43b9330603f0a003b02693705a3520637276478c299",
          "type": "write_resource",
        },
        {
          "address": "0xf008a23b120630ee8503ef4f7e7cf51f84da0858f332d889287f4983fdfdfb4a",
          "data": {
            "data": {
              "coin": {
                "value": "100900",
              },
              "deposit_events": {
                "counter": "2",
                "guid": {
                  "id": {
                    "addr": "0xf008a23b120630ee8503ef4f7e7cf51f84da0858f332d889287f4983fdfdfb4a",
                    "creation_num": "2",
                  },
                },
              },
              "frozen": false,
              "withdraw_events": {
                "counter": "1",
                "guid": {
                  "id": {
                    "addr": "0xf008a23b120630ee8503ef4f7e7cf51f84da0858f332d889287f4983fdfdfb4a",
                    "creation_num": "3",
                  },
                },
              },
            },
            "type": "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>",
          },
          "state_key_hash": "0x5e5e34448e75e3094b550d8a9e656dcc880b919db1538f0ff0412bc4873fe176",
          "type": "write_resource",
        },
        {
          "data": null,
          "handle": "0x1b854694ae746cdbd8d44186ca4929b2b337df21d1c74633be19b2710552fdca",
          "key": "0x0619dc29a0aac8fa146714058e8dd6d2d0f3bdf5f6331907bf91f3acd81e6935",
          "state_key_hash": "0x6e4b28d40f98a106a65163530924c0dcb40c1349d3aa915d108b4d6cfc1ddb19",
          "type": "write_table_item",
          "value": "0x8fe44b2afa0298010000000000000000",
        },
      ],
      "event_root_hash": "0x5351cc43b446576780b1eaa2346fa30853461a798e911f88a670eb64cd299c00",
      "events": [
        {
          "data": {
            "amount": "100000",
          },
          "guid": {
            "account_address": "0xbd03f6ccb723a48d7ad7329918e400060f029c613ab9365534684be6b5b514dc",
            "creation_number": "3",
          },
          "sequence_number": "107202",
          "type": "0x1::coin::WithdrawEvent",
        },
        {
          "data": {
            "amount": "100000",
          },
          "guid": {
            "account_address": "0xf008a23b120630ee8503ef4f7e7cf51f84da0858f332d889287f4983fdfdfb4a",
            "creation_number": "2",
          },
          "sequence_number": "1",
          "type": "0x1::coin::DepositEvent",
        },
        {
          "data": {
            "execution_gas_units": "5",
            "io_gas_units": "6",
            "storage_fee_octas": "0",
            "storage_fee_refund_octas": "0",
            "total_charge_gas_units": "11",
          },
          "guid": {
            "account_address": "0x0",
            "creation_number": "0",
          },
          "sequence_number": "0",
          "type": "0x1::transaction_fee::FeeStatement",
        },
      ],
      "expiration_timestamp_secs": "1744922725",
      "gas_unit_price": "100",
      "gas_used": "11",
      "hash": "0xf0f67d76af475864eec20f4243f8284f6d1cd1236c6704788f6a24464264d00c",
      "max_gas_amount": "1000",
      "payload": {
        "arguments": [
          "0xf008a23b120630ee8503ef4f7e7cf51f84da0858f332d889287f4983fdfdfb4a",
          "100000",
        ],
        "function": "0x1::aptos_account::transfer",
        "type": "entry_function_payload",
        "type_arguments": [],
      },
      "replay_protection_nonce": null,
      "sender": "0xbd03f6ccb723a48d7ad7329918e400060f029c613ab9365534684be6b5b514dc",
      "sequence_number": "213543",
      "signature": {
        "public_key": "0xf811372f0d9409e786da2d7a9b87e6fcdf5efd70c03f864327abdd8837e553e3",
        "signature": "0xa4617274d89c16e242e7d4978fb47c682ac39c5c848d02e2522b4b31ce24104eb25a5ebd0f07ae8f819fc5452c95fdfd785a7b9a9a86185e6af5c5b3bb983b01",
        "type": "ed25519_signature",
      },
      "state_change_hash": "0x75f11dd94216282004251fc2f5b69576d0a5b5321792f3bbb3b4dca0601adf36",
      "state_checkpoint_hash": null,
      "success": true,
      "timestamp": "1744922705338910",
      "txn_limits_request": null,
      "type": "user_transaction",
      "version": "2617328349",
      "vm_status": "Executed successfully",
    }
  `);
});
