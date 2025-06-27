// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { renderHook, waitFor } from "../../tests/utils";
import { useTransaction } from "./useTransaction";
import { test } from "../../tests/fixtures";
import { describe, expect } from "vitest";

describe("useTransaction", async () => {
  test("should fetch a transaction by ledger version", async ({ testnet }) => {
    const { result } = renderHook(testnet, () =>
      useTransaction({ ledgerVersion: 6690814066 })
    );

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

    expect(result.current.data).toMatchInlineSnapshot(`
    {
      "accumulator_root_hash": "0x7b958c66ea783fbaa766bfc11fa1b90d1ce4e7c59071d4aec945c18c9927e079",
      "changes": [
        {
          "address": "0xa550c18",
          "data": {
            "data": {
              "coin": {
                "value": "17001158397698636930",
              },
              "deposit_events": {
                "counter": "43255",
                "guid": {
                  "id": {
                    "addr": "0xa550c18",
                    "creation_num": "2",
                  },
                },
              },
              "frozen": false,
              "withdraw_events": {
                "counter": "447979",
                "guid": {
                  "id": {
                    "addr": "0xa550c18",
                    "creation_num": "3",
                  },
                },
              },
            },
            "type": "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>",
          },
          "state_key_hash": "0xc118832eb2876b73ab3d60bf65f5f38a51e0780f6a25f113d21ca1e9744e28e0",
          "type": "write_resource",
        },
        {
          "address": "0xa550c18",
          "data": {
            "data": {
              "authentication_key": "0x27c8e97c513fd30a2c5109626ca7b67f3de18a781f25b09979076bc37c5ac1e0",
              "coin_register_events": {
                "counter": "1",
                "guid": {
                  "id": {
                    "addr": "0xa550c18",
                    "creation_num": "0",
                  },
                },
              },
              "guid_creation_num": "4",
              "key_rotation_events": {
                "counter": "0",
                "guid": {
                  "id": {
                    "addr": "0xa550c18",
                    "creation_num": "1",
                  },
                },
              },
              "rotation_capability_offer": {
                "for": {
                  "vec": [],
                },
              },
              "sequence_number": "491186",
              "signer_capability_offer": {
                "for": {
                  "vec": [],
                },
              },
            },
            "type": "0x1::account::Account",
          },
          "state_key_hash": "0x6e4d2e3bac07f92c73595802e94e4f95a30bc197a366f1a707ff1d964c0cb31b",
          "type": "write_resource",
        },
        {
          "address": "0x9dd180c80a542fe9d84f44eec7dbaa425f49ebfce6d01842550cb705a17a48c0",
          "data": {
            "data": {
              "coin": {
                "value": "100000000",
              },
              "deposit_events": {
                "counter": "1",
                "guid": {
                  "id": {
                    "addr": "0x9dd180c80a542fe9d84f44eec7dbaa425f49ebfce6d01842550cb705a17a48c0",
                    "creation_num": "2",
                  },
                },
              },
              "frozen": false,
              "withdraw_events": {
                "counter": "0",
                "guid": {
                  "id": {
                    "addr": "0x9dd180c80a542fe9d84f44eec7dbaa425f49ebfce6d01842550cb705a17a48c0",
                    "creation_num": "3",
                  },
                },
              },
            },
            "type": "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>",
          },
          "state_key_hash": "0xcd79d812452eb59978d97b681f39822bc3a1d3d86d4c43c5a5e54220d49b7673",
          "type": "write_resource",
        },
        {
          "address": "0x9dd180c80a542fe9d84f44eec7dbaa425f49ebfce6d01842550cb705a17a48c0",
          "data": {
            "data": {
              "authentication_key": "0x9dd180c80a542fe9d84f44eec7dbaa425f49ebfce6d01842550cb705a17a48c0",
              "coin_register_events": {
                "counter": "1",
                "guid": {
                  "id": {
                    "addr": "0x9dd180c80a542fe9d84f44eec7dbaa425f49ebfce6d01842550cb705a17a48c0",
                    "creation_num": "0",
                  },
                },
              },
              "guid_creation_num": "4",
              "key_rotation_events": {
                "counter": "0",
                "guid": {
                  "id": {
                    "addr": "0x9dd180c80a542fe9d84f44eec7dbaa425f49ebfce6d01842550cb705a17a48c0",
                    "creation_num": "1",
                  },
                },
              },
              "rotation_capability_offer": {
                "for": {
                  "vec": [],
                },
              },
              "sequence_number": "0",
              "signer_capability_offer": {
                "for": {
                  "vec": [],
                },
              },
            },
            "type": "0x1::account::Account",
          },
          "state_key_hash": "0x11b80e9cefa36015b52d9a99724c0993fef3d3dd29f3309bc7d55054c2780568",
          "type": "write_resource",
        },
        {
          "data": null,
          "handle": "0x1b854694ae746cdbd8d44186ca4929b2b337df21d1c74633be19b2710552fdca",
          "key": "0x0619dc29a0aac8fa146714058e8dd6d2d0f3bdf5f6331907bf91f3acd81e6935",
          "state_key_hash": "0x6e4b28d40f98a106a65163530924c0dcb40c1349d3aa915d108b4d6cfc1ddb19",
          "type": "write_table_item",
          "value": "0xa354d498548664950100000000000000",
        },
      ],
      "event_root_hash": "0xad681194a3913f6fedbc8e2181769ef71547b4a1bfa506e4f3851c8697410a06",
      "events": [
        {
          "data": {
            "type_info": {
              "account_address": "0x1",
              "module_name": "0x6170746f735f636f696e",
              "struct_name": "0x4170746f73436f696e",
            },
          },
          "guid": {
            "account_address": "0x9dd180c80a542fe9d84f44eec7dbaa425f49ebfce6d01842550cb705a17a48c0",
            "creation_number": "0",
          },
          "sequence_number": "0",
          "type": "0x1::account::CoinRegisterEvent",
        },
        {
          "data": {
            "amount": "100000000",
          },
          "guid": {
            "account_address": "0xa550c18",
            "creation_number": "3",
          },
          "sequence_number": "447978",
          "type": "0x1::coin::WithdrawEvent",
        },
        {
          "data": {
            "amount": "100000000",
          },
          "guid": {
            "account_address": "0x9dd180c80a542fe9d84f44eec7dbaa425f49ebfce6d01842550cb705a17a48c0",
            "creation_number": "2",
          },
          "sequence_number": "0",
          "type": "0x1::coin::DepositEvent",
        },
        {
          "data": {
            "execution_gas_units": "6",
            "io_gas_units": "5",
            "storage_fee_octas": "98800",
            "storage_fee_refund_octas": "0",
            "total_charge_gas_units": "999",
          },
          "guid": {
            "account_address": "0x0",
            "creation_number": "0",
          },
          "sequence_number": "0",
          "type": "0x1::transaction_fee::FeeStatement",
        },
      ],
      "expiration_timestamp_secs": "1744787409",
      "gas_unit_price": "100",
      "gas_used": "999",
      "hash": "0xfbc9efcfa5600c806631bd5e60e57a58f5d9ad3c5d1fb4c2bf99a3ff5af766ff",
      "max_gas_amount": "200000",
      "payload": {
        "arguments": [
          "0x9dd180c80a542fe9d84f44eec7dbaa425f49ebfce6d01842550cb705a17a48c0",
          "100000000",
        ],
        "function": "0x1::aptos_account::transfer",
        "type": "entry_function_payload",
        "type_arguments": [],
      },
      "replay_protection_nonce": null,
      "sender": "0xa550c18",
      "sequence_number": "491185",
      "signature": {
        "public_key": "0x2d9566d5f834e5f170d4224784b0eaa6284ca449eff5678c360bf45047e5260e",
        "signature": "0xa8f9ada16fdb3b237a882300f78e1ef18bb0a89266d2f2046562906b9816f6f919c367cc2ffd2a18a669ccc242b93512b445e531fe78790b1b77b453b0b2d208",
        "type": "ed25519_signature",
      },
      "state_change_hash": "0xac9da2cb5ea9cf722486fdd6f6f1f653ebce9dcb50099afa560110ccda2bf6b7",
      "state_checkpoint_hash": null,
      "success": true,
      "timestamp": "1744787389313149",
      "type": "user_transaction",
      "version": "6690814066",
      "vm_status": "Executed successfully",
    }
  `);
  });

  test("should fetch a transaction by transaction hash", async ({
    testnet,
  }) => {
    const { result } = renderHook(testnet, () =>
      useTransaction({
        transactionHash:
          "0xfbc9efcfa5600c806631bd5e60e57a58f5d9ad3c5d1fb4c2bf99a3ff5af766ff",
      })
    );

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

    expect(result.current.data).toMatchInlineSnapshot(`
      {
        "accumulator_root_hash": "0x7b958c66ea783fbaa766bfc11fa1b90d1ce4e7c59071d4aec945c18c9927e079",
        "changes": [
          {
            "address": "0xa550c18",
            "data": {
              "data": {
                "coin": {
                  "value": "17001158397698636930",
                },
                "deposit_events": {
                  "counter": "43255",
                  "guid": {
                    "id": {
                      "addr": "0xa550c18",
                      "creation_num": "2",
                    },
                  },
                },
                "frozen": false,
                "withdraw_events": {
                  "counter": "447979",
                  "guid": {
                    "id": {
                      "addr": "0xa550c18",
                      "creation_num": "3",
                    },
                  },
                },
              },
              "type": "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>",
            },
            "state_key_hash": "0xc118832eb2876b73ab3d60bf65f5f38a51e0780f6a25f113d21ca1e9744e28e0",
            "type": "write_resource",
          },
          {
            "address": "0xa550c18",
            "data": {
              "data": {
                "authentication_key": "0x27c8e97c513fd30a2c5109626ca7b67f3de18a781f25b09979076bc37c5ac1e0",
                "coin_register_events": {
                  "counter": "1",
                  "guid": {
                    "id": {
                      "addr": "0xa550c18",
                      "creation_num": "0",
                    },
                  },
                },
                "guid_creation_num": "4",
                "key_rotation_events": {
                  "counter": "0",
                  "guid": {
                    "id": {
                      "addr": "0xa550c18",
                      "creation_num": "1",
                    },
                  },
                },
                "rotation_capability_offer": {
                  "for": {
                    "vec": [],
                  },
                },
                "sequence_number": "491186",
                "signer_capability_offer": {
                  "for": {
                    "vec": [],
                  },
                },
              },
              "type": "0x1::account::Account",
            },
            "state_key_hash": "0x6e4d2e3bac07f92c73595802e94e4f95a30bc197a366f1a707ff1d964c0cb31b",
            "type": "write_resource",
          },
          {
            "address": "0x9dd180c80a542fe9d84f44eec7dbaa425f49ebfce6d01842550cb705a17a48c0",
            "data": {
              "data": {
                "coin": {
                  "value": "100000000",
                },
                "deposit_events": {
                  "counter": "1",
                  "guid": {
                    "id": {
                      "addr": "0x9dd180c80a542fe9d84f44eec7dbaa425f49ebfce6d01842550cb705a17a48c0",
                      "creation_num": "2",
                    },
                  },
                },
                "frozen": false,
                "withdraw_events": {
                  "counter": "0",
                  "guid": {
                    "id": {
                      "addr": "0x9dd180c80a542fe9d84f44eec7dbaa425f49ebfce6d01842550cb705a17a48c0",
                      "creation_num": "3",
                    },
                  },
                },
              },
              "type": "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>",
            },
            "state_key_hash": "0xcd79d812452eb59978d97b681f39822bc3a1d3d86d4c43c5a5e54220d49b7673",
            "type": "write_resource",
          },
          {
            "address": "0x9dd180c80a542fe9d84f44eec7dbaa425f49ebfce6d01842550cb705a17a48c0",
            "data": {
              "data": {
                "authentication_key": "0x9dd180c80a542fe9d84f44eec7dbaa425f49ebfce6d01842550cb705a17a48c0",
                "coin_register_events": {
                  "counter": "1",
                  "guid": {
                    "id": {
                      "addr": "0x9dd180c80a542fe9d84f44eec7dbaa425f49ebfce6d01842550cb705a17a48c0",
                      "creation_num": "0",
                    },
                  },
                },
                "guid_creation_num": "4",
                "key_rotation_events": {
                  "counter": "0",
                  "guid": {
                    "id": {
                      "addr": "0x9dd180c80a542fe9d84f44eec7dbaa425f49ebfce6d01842550cb705a17a48c0",
                      "creation_num": "1",
                    },
                  },
                },
                "rotation_capability_offer": {
                  "for": {
                    "vec": [],
                  },
                },
                "sequence_number": "0",
                "signer_capability_offer": {
                  "for": {
                    "vec": [],
                  },
                },
              },
              "type": "0x1::account::Account",
            },
            "state_key_hash": "0x11b80e9cefa36015b52d9a99724c0993fef3d3dd29f3309bc7d55054c2780568",
            "type": "write_resource",
          },
          {
            "data": null,
            "handle": "0x1b854694ae746cdbd8d44186ca4929b2b337df21d1c74633be19b2710552fdca",
            "key": "0x0619dc29a0aac8fa146714058e8dd6d2d0f3bdf5f6331907bf91f3acd81e6935",
            "state_key_hash": "0x6e4b28d40f98a106a65163530924c0dcb40c1349d3aa915d108b4d6cfc1ddb19",
            "type": "write_table_item",
            "value": "0xa354d498548664950100000000000000",
          },
        ],
        "event_root_hash": "0xad681194a3913f6fedbc8e2181769ef71547b4a1bfa506e4f3851c8697410a06",
        "events": [
          {
            "data": {
              "type_info": {
                "account_address": "0x1",
                "module_name": "0x6170746f735f636f696e",
                "struct_name": "0x4170746f73436f696e",
              },
            },
            "guid": {
              "account_address": "0x9dd180c80a542fe9d84f44eec7dbaa425f49ebfce6d01842550cb705a17a48c0",
              "creation_number": "0",
            },
            "sequence_number": "0",
            "type": "0x1::account::CoinRegisterEvent",
          },
          {
            "data": {
              "amount": "100000000",
            },
            "guid": {
              "account_address": "0xa550c18",
              "creation_number": "3",
            },
            "sequence_number": "447978",
            "type": "0x1::coin::WithdrawEvent",
          },
          {
            "data": {
              "amount": "100000000",
            },
            "guid": {
              "account_address": "0x9dd180c80a542fe9d84f44eec7dbaa425f49ebfce6d01842550cb705a17a48c0",
              "creation_number": "2",
            },
            "sequence_number": "0",
            "type": "0x1::coin::DepositEvent",
          },
          {
            "data": {
              "execution_gas_units": "6",
              "io_gas_units": "5",
              "storage_fee_octas": "98800",
              "storage_fee_refund_octas": "0",
              "total_charge_gas_units": "999",
            },
            "guid": {
              "account_address": "0x0",
              "creation_number": "0",
            },
            "sequence_number": "0",
            "type": "0x1::transaction_fee::FeeStatement",
          },
        ],
        "expiration_timestamp_secs": "1744787409",
        "gas_unit_price": "100",
        "gas_used": "999",
        "hash": "0xfbc9efcfa5600c806631bd5e60e57a58f5d9ad3c5d1fb4c2bf99a3ff5af766ff",
        "max_gas_amount": "200000",
        "payload": {
          "arguments": [
            "0x9dd180c80a542fe9d84f44eec7dbaa425f49ebfce6d01842550cb705a17a48c0",
            "100000000",
          ],
          "function": "0x1::aptos_account::transfer",
          "type": "entry_function_payload",
          "type_arguments": [],
        },
        "replay_protection_nonce": null,
        "sender": "0xa550c18",
        "sequence_number": "491185",
        "signature": {
          "public_key": "0x2d9566d5f834e5f170d4224784b0eaa6284ca449eff5678c360bf45047e5260e",
          "signature": "0xa8f9ada16fdb3b237a882300f78e1ef18bb0a89266d2f2046562906b9816f6f919c367cc2ffd2a18a669ccc242b93512b445e531fe78790b1b77b453b0b2d208",
          "type": "ed25519_signature",
        },
        "state_change_hash": "0xac9da2cb5ea9cf722486fdd6f6f1f653ebce9dcb50099afa560110ccda2bf6b7",
        "state_checkpoint_hash": null,
        "success": true,
        "timestamp": "1744787389313149",
        "type": "user_transaction",
        "version": "6690814066",
        "vm_status": "Executed successfully",
      }
    `);
  });
});
