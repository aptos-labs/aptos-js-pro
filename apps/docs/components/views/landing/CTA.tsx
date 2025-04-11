import { AuroraText } from "@/components/ui/aurora-text";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="relative mx-auto container">
      <div className="border border-b-0 border-border relative text-center py-16">
        <p className="max-w-3xl mx-auto text-3xl bg-background leading-normal">
          Build with{" "}
          <AuroraText className="font-semibold">@aptos-labs/js-pro</AuroraText>
        </p>

        <br />

        <div className="flex justify-center gap-4">
          <Button className="w-fit" asChild>
            <Link href="/react">React</Link>
          </Button>
          <Button className="w-fit" asChild>
            <Link href="/typescript">TypeScript</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
