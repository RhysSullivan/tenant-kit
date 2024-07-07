import { DomainConfiguration } from "@/domains/client";
import { Code } from "bright";
import fs from "fs";
export default function Home() {
  // read the source code from src/domains/client.tsx
  const source = fs.readFileSync("src/domains/client.tsx", "utf-8");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <DomainConfiguration domain="hello" />
      <Code lang="tsx" code={source} />
    </main>
  );
}
