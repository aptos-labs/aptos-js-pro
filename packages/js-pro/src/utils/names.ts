// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

export class AptosName {
  readonly #domain?: string;

  readonly #subdomain?: string;

  constructor(name: string);

  constructor(domain: string, subdomain?: string | null);

  constructor(domain: string, subdomain?: string | null) {
    if (!domain) return;

    const name = [subdomain, domain].filter(Boolean).join(".");

    const normalized = name.toLowerCase().replace(/(\.apt)$/, "");

    // ^               - Asserts the start of the string
    // (?:             - Start of a non-capturing group
    //    ([^.]+)\.    - Capturing group for the subdomain (if present)
    // )?              - End of the non-capturing group
    // ([^.]+)         - Capturing group for the domain
    // $               - Asserts the end of the string.
    const regex = /^(?:([a-zA-Z0-9-]+)\.)?([a-zA-Z0-9-]+)$/;

    const match = normalized.match(regex);

    if (!match) return;

    const [, parsedSubdomain, parsedDomain] = match;

    this.#domain = parsedDomain;
    this.#subdomain = parsedSubdomain;
  }

  toString(): string {
    if (!this.#domain) return "";

    return this.noSuffix().concat(".apt");
  }

  noSuffix(): string {
    if (!this.#domain) return "";

    if (!this.#subdomain) return this.#domain;

    return `${this.#subdomain}.${this.#domain}`;
  }
}
