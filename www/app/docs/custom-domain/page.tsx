import { SiteSettingsDomains } from "@/domains/client";
import { Code } from "bright";
import {
	DocsPage,
	DocsTitle,
	DocsDescription,
	DocsBody,
} from "fumadocs-ui/page";
import fs from "fs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CopyButton } from "./copy-button";

export default function Page() {
	const pwd = process.cwd();
	console.log(pwd);
	const client = fs.readFileSync("../kit/src/domains/client.tsx", "utf-8");
	const action = fs.readFileSync("../kit/src/domains/actions.ts", "utf-8");
	return (
		<DocsPage>
			<DocsTitle>Custom Domain</DocsTitle>
			<DocsDescription>Set up a custom domain for your tenant</DocsDescription>
			<DocsBody>
				<div className="flex flex-col gap-2 not-prose">
					<span className="text-lg font-semibold">
						Default custom domain component
					</span>
					<SiteSettingsDomains />
				</div>
				<div className="py-4">
					<Tabs defaultValue="client" className="relative ">
						<TabsList>
							<TabsTrigger value="client">Client</TabsTrigger>
							<TabsTrigger value="actions">Actions</TabsTrigger>
						</TabsList>
						<TabsContent
							value="client"
							className="max-h-[500px] overflow-y-auto pt-2"
						>
							<CopyButton text={client} className="absolute right-2 -top-1" />
							<Code lang="tsx" code={client} />
						</TabsContent>
						<TabsContent
							value="actions"
							className="max-h-[500px] overflow-y-auto pt-2"
						>
							<CopyButton text={action} className="absolute right-2 -top-1" />
							<Code lang="tsx" code={action} />
						</TabsContent>
					</Tabs>
				</div>
				<div className="py-4 not-prose flex gap-4 flex-col">
					<div className="flex flex-col gap-1">
						<span className="text-xl font-semibold">Examples</span>
						<hr className="mb-1" />
					</div>
					<div className="flex flex-col gap-2">
						<span className="text-lg font-semibold">
							Custom domain component pending txt verification
						</span>
						<SiteSettingsDomains defaultDomain="test.test.com" />
					</div>
					<div className="flex flex-col gap-2">
						<span className="text-lg font-semibold">
							Custom domain component CNAME configuration
						</span>
						<SiteSettingsDomains defaultDomain="domain.rhys.dev" />
					</div>
					<div className="flex flex-col gap-2">
						<span className="text-lg font-semibold">
							Custom domain component A configuration
						</span>
						<SiteSettingsDomains defaultDomain="rhys.dev" />
					</div>
				</div>
			</DocsBody>
		</DocsPage>
	);
}
