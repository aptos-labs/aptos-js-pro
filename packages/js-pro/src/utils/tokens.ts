// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { APTOS_NAMES_ENDPOINT } from "../constants/endpoints.js";

export function fixBadAptosUri(uri: string) {
  const match =
    uri.match(/^https:\/\/aptosnames.com\/name\/([^/]+)$/) ??
    uri.match(
      /^https:\/\/aptosnames.com\/api(?:\/[^/]+)?\/v\d+\/metadata\/([^/]+)/
    );
  return match ? `${APTOS_NAMES_ENDPOINT}/v1/metadata/${match[1]}` : uri;
}
