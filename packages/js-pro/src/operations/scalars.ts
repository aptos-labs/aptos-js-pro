// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

export const scalars = {
  numeric: "number",
  timestamp: "string",
  bigint: "string",
};

export const typesScalars = {
  ...scalars,
  jsonb: "JSONValue",
};

export const operationsScalars = {
  ...scalars,
  jsonb: "Types.JSONValue",
};
