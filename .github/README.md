<p align="center">
  <a href="https://js-pro.aptos.dev">
    <img alt="Aptos Logo" src="./aptos_logo.svg" width="auto" height="60">
  </a>
</p>

<p align="center" style="font-size: 24px; font-weight: bold;">
<b>
Aptos JS-Pro
</b>
</p>
<p align="center">
  A library of opinionated utilities built on top of the <a href="https://github.com/aptos-labs/aptos-ts-sdk"><code>@aptos-labs/ts-sdk</code></a>
</p>

<div align="center">
   <a href="https://github.com/aptos-labs/aptos-js-pro/blob/main/LICENSE">
      <img src="https://img.shields.io/badge/License-Apache_2.0-blue.svg" alt="Apache 2.0 License">
   </a>
</div>

## Overview

Aptos JS-Pro is a library of utilities built on top of the `@aptos-labs/ts-sdk`. This library is focused on an opinionated tools based off of internal usecases derived from Aptos Labs products such as Petra and Aptos Connect.

## Documentation

Please visit [js-pro.aptos.dev](https://js-pro.aptos.dev) for the latest documentation.

## Installation

> [!NOTE]
> These packages are still in development and may change rapidly as they are developed.

### TypeScript

```bash
npm install @aptos-labs/ts-sdk @aptos-labs/js-pro
```

### React

```bash
npm install @aptos-labs/ts-sdk @aptos-labs/js-pro @tanstack/react-query @aptos-labs/react
```

## Getting Started

### Prerequisites

Check out [`.tool-versions`](.tool-versions) for runtime requirements.

### Installation

1. Clone the repository:

```bash
git clone https://github.com/aptos-labs/aptos-js-pro.git
cd aptos-js-pro
```

2. Install runtimes (mise)

```bash
mise install
```

If `mise` is not installed, check out their [Getting Started](https://mise.jdx.dev/getting-started.html) page.

3. Install dependencies:

```bash
pnpm install
```

4. Build packages:

```bash
pnpm build
```

5. Run tests:

```bash
pnpm test
```

6. Run checks:

```bash
pnpm check
```

### Deployment

The documentation is automatically deployed to [js-pro.aptos.dev](https://js-pro.aptos.dev) when a pull request is merged into the `main` branch. This deployment is handled through a private Vercel instance.

## Contributing

Contributions are welcome! Please refer to the [CONTRIBUTING.md](./CONTRIBUTING.md) file for more information.
