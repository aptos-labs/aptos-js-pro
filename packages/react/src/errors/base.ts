// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { AptosBaseError } from "@aptos-labs/js-pro";

export class AptosReactBaseError extends AptosBaseError {
  override docsBaseUrl = "https://jspro.aptos.dev/react";

  override name = "AptosReactError";
}
