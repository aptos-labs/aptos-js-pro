// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0
import { expect } from "vitest";
import { test } from "../../tests/fixtures";

test("waitForTransaction", async ({ testnet }) => {
  const transactionResult = await testnet.waitForTransaction({
    hash: "0xb119c1b00bc6d37f0af3ef0fe5667634a9d02726dad3f019e58bafef0c62d317",
  });

  expect(transactionResult).toMatchInlineSnapshot(`
    {
      "accumulator_root_hash": "0x1b723bc3da72e5b7671d943e59001e72a38d61efe4dbc3af213788055d14735e",
      "changes": [
        {
          "address": "0x98d84c2387fc01dfc4752f36b29adb4a4956cd1f45945ed2a0fa5a06dd3d174b",
          "data": {
            "data": {
              "coin": {
                "value": "33565350",
              },
              "deposit_events": {
                "counter": "1",
                "guid": {
                  "id": {
                    "addr": "0x98d84c2387fc01dfc4752f36b29adb4a4956cd1f45945ed2a0fa5a06dd3d174b",
                    "creation_num": "2",
                  },
                },
              },
              "frozen": false,
              "withdraw_events": {
                "counter": "0",
                "guid": {
                  "id": {
                    "addr": "0x98d84c2387fc01dfc4752f36b29adb4a4956cd1f45945ed2a0fa5a06dd3d174b",
                    "creation_num": "3",
                  },
                },
              },
            },
            "type": "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>",
          },
          "state_key_hash": "0x19f8e83c8badb2efb9853947a28e980713439e0a2352382737cf7e34ac58483f",
          "type": "write_resource",
        },
        {
          "address": "0x98d84c2387fc01dfc4752f36b29adb4a4956cd1f45945ed2a0fa5a06dd3d174b",
          "data": {
            "data": {
              "authentication_key": "0x98d84c2387fc01dfc4752f36b29adb4a4956cd1f45945ed2a0fa5a06dd3d174b",
              "coin_register_events": {
                "counter": "2",
                "guid": {
                  "id": {
                    "addr": "0x98d84c2387fc01dfc4752f36b29adb4a4956cd1f45945ed2a0fa5a06dd3d174b",
                    "creation_num": "0",
                  },
                },
              },
              "guid_creation_num": "6",
              "key_rotation_events": {
                "counter": "0",
                "guid": {
                  "id": {
                    "addr": "0x98d84c2387fc01dfc4752f36b29adb4a4956cd1f45945ed2a0fa5a06dd3d174b",
                    "creation_num": "1",
                  },
                },
              },
              "rotation_capability_offer": {
                "for": {
                  "vec": [],
                },
              },
              "sequence_number": "19892",
              "signer_capability_offer": {
                "for": {
                  "vec": [],
                },
              },
            },
            "type": "0x1::account::Account",
          },
          "state_key_hash": "0x0424b7bbf5327ea2927b509b910640db60598f83640fcf2be82cf66ed72c16a6",
          "type": "write_resource",
        },
        {
          "address": "0x98d84c2387fc01dfc4752f36b29adb4a4956cd1f45945ed2a0fa5a06dd3d174b",
          "data": {
            "data": {
              "bonus": "0",
              "claimed_rewards": false,
              "equipment_bonus": "0",
              "gloves": {
                "vec": [],
              },
              "hat": {
                "vec": [],
              },
              "next_milestone_index": "3",
              "pet": {
                "vec": [],
              },
              "plays": "18609",
              "task_points": "0",
            },
            "type": "0xe20af97eaaf8cc006c397b75afb8da4806b944b8b30e5c47e259f2f23a1e2ddd::tapos_game_2::Player",
          },
          "state_key_hash": "0xf547bb85b4971d3e01321c853e9a21fdd0a1bf407324500a335a5166dddaa07d",
          "type": "write_resource",
        },
        {
          "address": "0xe20af97eaaf8cc006c397b75afb8da4806b944b8b30e5c47e259f2f23a1e2ddd",
          "data": {
            "data": {
              "next_milestone": "1329510000",
              "total_bonus": {
                "max_value": "18446744073709551615",
                "value": "0",
              },
              "total_transactions": {
                "max_value": "18446744073709551615",
                "value": "1329463070",
              },
            },
            "type": "0xe20af97eaaf8cc006c397b75afb8da4806b944b8b30e5c47e259f2f23a1e2ddd::tapos_game_2::CurrentGame",
          },
          "state_key_hash": "0xf4ff17aad712e383b34df996e2f3b2b3e5c3f5c170750c8ec1ca8e79d23bcf05",
          "type": "write_resource",
        },
        {
          "data": null,
          "handle": "0x1b854694ae746cdbd8d44186ca4929b2b337df21d1c74633be19b2710552fdca",
          "key": "0x0619dc29a0aac8fa146714058e8dd6d2d0f3bdf5f6331907bf91f3acd81e6935",
          "state_key_hash": "0x6e4b28d40f98a106a65163530924c0dcb40c1349d3aa915d108b4d6cfc1ddb19",
          "type": "write_table_item",
          "value": "0x24dda2599879a5940100000000000000",
        },
      ],
      "event_root_hash": "0x91d233f7235399cf448a872a161758f850babb9020b8a24dc76a5af640bb8dfb",
      "events": [
        {
          "data": {
            "execution_gas_units": "4",
            "io_gas_units": "4",
            "storage_fee_octas": "0",
            "storage_fee_refund_octas": "0",
            "total_charge_gas_units": "8",
          },
          "guid": {
            "account_address": "0x0",
            "creation_number": "0",
          },
          "sequence_number": "0",
          "type": "0x1::transaction_fee::FeeStatement",
        },
      ],
      "expiration_timestamp_secs": "1719839352",
      "gas_unit_price": "100",
      "gas_used": "8",
      "hash": "0xb119c1b00bc6d37f0af3ef0fe5667634a9d02726dad3f019e58bafef0c62d317",
      "max_gas_amount": "50000",
      "payload": {
        "arguments": [
          true,
        ],
        "function": "0xe20af97eaaf8cc006c397b75afb8da4806b944b8b30e5c47e259f2f23a1e2ddd::tapos_game_2::play",
        "type": "entry_function_payload",
        "type_arguments": [],
      },
      "replay_protection_nonce": null,
      "sender": "0x98d84c2387fc01dfc4752f36b29adb4a4956cd1f45945ed2a0fa5a06dd3d174b",
      "sequence_number": "19891",
      "signature": {
        "public_key": "0x1d2c423122d67eed0776ed0dda3b4a385d9c4822467004f4e7f777bc1da87ba8",
        "signature": "0x955996033a22507d2af47d436fb85403134928ffc516a7d869e988e5ee2fe2dfdd1f0ed884c4bb8a3bf3ff7cf757c4fc3e23aee782d49b506a8debb2e5cd000c",
        "type": "ed25519_signature",
      },
      "state_change_hash": "0xc8e733bbab76c835cb47f4cf2b630b159eb919593ee9f71d850476905c4d8b76",
      "state_checkpoint_hash": null,
      "success": true,
      "timestamp": "1719839333100588",
      "type": "user_transaction",
      "version": "2614808448",
      "vm_status": "Executed successfully",
    }
  `);
});
