// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import type { NextConfig } from "next";

import nextra from "nextra";

const withNextra = nextra({});

const nextConfig: NextConfig = {
  eslint: {
    dirs: ["pages", "components", "lib", "context"],
  },
};

export default withNextra(nextConfig);
