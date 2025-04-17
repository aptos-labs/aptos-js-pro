import { describe, expect } from "vitest";
import { test } from "../../tests/fixtures";
import { Network } from "@aptos-labs/ts-sdk";

describe("getClients", () => {
  test("should return the clients", async ({ devnet }) => {
    const clients = devnet.getClients();

    expect(clients).toBeDefined();
  });

  test("should return the clients for a different network", async ({
    devnet,
  }) => {
    const clients = devnet.getClients({
      network: { network: Network.TESTNET },
    });

    expect(clients).toBeDefined();
  });
});
