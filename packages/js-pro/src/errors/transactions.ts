// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { AptosBaseError } from "./base.js";

export class SenderNotFoundError extends AptosBaseError {
  override name = "SenderNotFoundError";

  constructor() {
    super("No sender found");
  }
}
