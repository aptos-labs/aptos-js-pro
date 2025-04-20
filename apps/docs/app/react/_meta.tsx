// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0
import type { MetaRecord } from "nextra";

export default {
  index: "Introduction",
  "quick-start": "Quick Start",
  "#": { type: "separator", title: "Queries" },
  queries: {
    display: "children",
  },
  "##": { type: "separator", title: "Mutations" },
  mutations: {
    display: "children",
  },
} satisfies MetaRecord;
