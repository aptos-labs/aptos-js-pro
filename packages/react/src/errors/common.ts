// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0
import { AptosReactBaseError } from "./base.js";

export class ClientContextMissingError extends AptosReactBaseError {
  override name = "ClientContextMissingError";

  constructor() {
    super(
      "AptosJSCoreProvider must be defined in order to use useAptosClient",
      {
        longMessage:
          "Make sure to wrap your application with AptosJSCoreProvider to use Aptos React hooks.",
      }
    );
  }
}

export class MissingRequiredArgumentError extends AptosReactBaseError {
  override name = "MissingRequiredArgumentError";

  constructor(argName: string) {
    super(`${argName} is required`, {
      longMessage: `This argument ${argName} is required to be provided for this hook.`,
    });
  }
}

export class SimulationArgumentError extends AptosReactBaseError {
  override name = "SimulationArgumentError";

  constructor(message?: string) {
    super(message ?? "Invalid arguments passed to simulation");
  }
}

export class AccountNotFoundError extends AptosReactBaseError {
  override name = "AccountNotFoundError";

  constructor() {
    super("No account found.");
  }
}
