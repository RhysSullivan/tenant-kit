import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SiteSettingsDomains } from "@/domains/client";
import { Code } from "bright";
import fs from "fs";
export default function Home() {
  // read the source code from src/domains/client.tsx
  const clientSource = fs.readFileSync("src/domains/client.tsx", "utf-8");
  const actionsSource = fs.readFileSync("src/domains/actions.tsx", "utf-8");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SiteSettingsDomains />
      <Tabs className="w-[400px] " defaultValue="client">
        <TabsList className=" h-7 rounded-md p-0 px-[calc(theme(spacing.1)_-_2px)] py-[theme(spacing.1)]">
          <TabsTrigger
            value="client"
            className="h-[1.45rem] rounded-sm px-2 text-xs"
          >
            Client
          </TabsTrigger>
          <TabsTrigger
            value="actions"
            className="h-[1.45rem] rounded-sm px-2 text-xs"
          >
            Actions
          </TabsTrigger>
        </TabsList>
        <TabsContent value="client" className="max-h-[600px] max-w-[300px]">
          <Code lang="tsx" code={clientSource} className="overflow-auto" />
        </TabsContent>
        <TabsContent value="actions" className="max-h-[600px] max-w-[300px]">
          <Code
            lang="tsx"
            code={actionsSource}
            className="max-h-[600px] max-w-[300px] overflow-auto"
          />
        </TabsContent>
      </Tabs>
    </main>
  );
}
