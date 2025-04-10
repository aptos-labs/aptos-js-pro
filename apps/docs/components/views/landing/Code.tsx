import { createHighlighter } from "shiki";
import CodeExamples from "./CodeExamples";

export interface CodeOption {
  title: string;
  lang?: string;
  description: string;
  code: string;
}

const options: CodeOption[] = [
  {
    title: "1. Setup Providers",
    lang: "tsx",
    description:
      "Setup your app providers for Tanstack Query, Aptos Wallet Adapter, and Aptos JS-Pro.",
    code: `import { AptosJSCoreProvider, useWalletAdapterCore } from '@aptos-labs/react';
import { AptosWalletAdapterProvider, useWallet } from '@aptos-labs/wallet-adapter-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
 
const queryClient = new QueryClient();
 
function AptosCoreProvider({ children }: { children: React.ReactNode }) {
  const wallet = useWallet();
 
  const core = useWalletAdapterCore({ wallet });
 
  return <AptosJSCoreProvider core={core}>{children}</AptosJSCoreProvider>;
}
 
export default function App() {
  return (
    <AptosWalletAdapterProvider>
      <QueryClientProvider client={queryClient}>
        <AptosCoreProvider>{/* <AppComponent /> */}</AptosCoreProvider>
      </QueryClientProvider>
    </AptosWalletAdapterProvider>
  );
}`,
  },
  {
    title: "2. Fetching Balances",
    description:
      "Utilize a collection of queries to interact with the Aptos blockchain such as fetching account information and balances.",
    code: `export default function AccountPage() {
  const account = useAccount();
  const { data: balance } = useAptBalance()

  return (
    <div>
      <div>Account: {account?.address}</div>
      <div>APT Balanace: {balance?.value}</div>
    </div>
  );
}`,
  },
  {
    title: "3. Sending Coins",
    description:
      "Utilize a collection of mutations to interact with the Aptos blockchain such as sending transactions.",
    code: `import * as React from 'react';
import {
  useSignAndSubmitTransaction,
  useWaitForTransaction,
} from '@aptos-labs/react';
import { parseApt } from '@aptos-labs/js-pro';
 
function SendTransaction() {
  const { hash, signAndSubmitTransaction } = useSignAndSubmitTransaction();
 
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransaction({ hash });
 
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const address = formData.get('address') as \`0x\${string}\`;
    const value = formData.get('value') as string;
    signAndSubmitTransaction({
      data: {
        function: \`0x1::aptos_account::transfer\`,
        functionArguments: [address, parseApt(amount)],
        typeArguments: [],
      },
    });
  }
 
  useEffect(() => {
    if (isConfirmed) {
      window.alert(\`Your transaction has been sent! \${hash}\`);
    }
  }, [isConfirmed]);
 
  return (
    <form onSubmit={submit}>
      <input name="address" placeholder="0x1…e918" required />
      <input name="value" placeholder="0.1" required />
      <button type="submit">Send</button>
      {hash && <div>Transaction Hash: {hash}</div>}
      {isConfirming && <div>Waiting for confirmation...</div>}
      {isConfirmed && <div>Transaction confirmed.</div>}
    </form>
  );
}`,
  },
];

export default async function Code() {
  const highlighter = await createHighlighter({
    langs: ["typescript", "tsx"],
    themes: ["github-light", "github-dark"],
  });

  const highlightedOptions = options.map((e) => ({
    ...e,
    code: highlighter.codeToHtml(e.code, {
      lang: e.lang ?? "typescript",
      themes: { light: "github-light", dark: "github-dark" },
    }),
  }));

  return (
    <section className="relative mx-auto container">
      <div className="border-x border-border uppercase text-muted-foreground flex items-center justify-center py-8">
        Get started with these examples
      </div>

      <CodeExamples options={highlightedOptions} />
    </section>
  );
}
