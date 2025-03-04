// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

export interface AptosBaseErrorOptions {
  longMessage?: string;
}

export class AptosBaseError extends Error {
  shortMessage: string;

  longMessage?: string;

  docsBaseUrl = "https://js-pro-docs.vercel.app/";

  override name = "AptosJSProError";

  constructor(shortMessage: string, options?: AptosBaseErrorOptions) {
    super();

    this.shortMessage = shortMessage;
    this.longMessage = options?.longMessage;
  }
}
