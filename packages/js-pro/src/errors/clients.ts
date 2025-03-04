// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { AptosBaseError } from "./base.js";

export class IndexerNotInitializedError extends AptosBaseError {
  override name = "IndexerNotInitializedError";

  constructor() {
    super("The AptosJSProClient was not initialized with an indexer", {
      longMessage:
        "The AptosJSProClient was not initialized with an indexer. Please specify an indexer endpoint when setting up custom networks.",
    });
  }
}

export class SignerNotFoundError extends AptosBaseError {
  override name = "SignerNotFoundError";

  constructor() {
    super("The AptosJSProClient was not initialized with a signer", {
      longMessage:
        "The AptosJSProClient was not initialized with a signer. Please specify a signer when setting up the client.",
    });
  }
}
