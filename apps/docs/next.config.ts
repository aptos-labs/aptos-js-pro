// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import type { NextConfig } from "next";

import nextra from "nextra";

const withNextra = nextra({});

const nextConfig: NextConfig = {
  eslint: {
    dirs: ["pages", "components", "lib", "context"],
  },
  redirects: async () => [
    {
      source: "/typescript",
      destination: "/typescript/introduction/quick-start",
      statusCode: 302,
    },
    {
      source: "/react",
      destination: "/react/introduction/quick-start",
      statusCode: 302,
    },
  ],
};

export default withNextra(nextConfig);
