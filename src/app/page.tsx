import { SiteSettingsDomains } from "@/domains/client";
import { Code } from "bright";
import fs from "fs";
export default function Home() {
  // read the source code from src/domains/client.tsx
  const source = fs.readFileSync("src/domains/client.tsx", "utf-8");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SiteSettingsDomains defaultValue="test.rhyssul.com" />
      <div className="max-w-[600px] overflow-x-auto">
        <Code lang="tsx" code={source} />
      </div>
    </main>
  );
}
