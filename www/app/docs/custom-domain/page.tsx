import { Code } from "bright";
import {
	DocsPage,
	DocsTitle,
	DocsDescription,
	DocsBody,
} from "fumadocs-ui/page";
import fs from "node:fs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CopyButton } from "./copy-button";
import { SiteSettingsDomains } from "@/components/domains/client";

export default function Page() {
	const pwd = process.cwd();
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
					<span>
						This code is an updated version of the{" "}
						<a
							href="https://github.com/vercel/platforms"
							// biome-ignore lint/a11y/noBlankTarget: <explanation>
							target="_blank"
							className="text-blue-500 hover:underline"
						>
							Platforms
						</a>{" "}
						project from Vercel, meant to be a more drop in style using shadcn &
						server actions
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
							<Code
								lang="tsx"
								code={client}
								className="hidden dark:block"
								theme="github-dark"
							/>
							<Code
								lang="tsx"
								code={client}
								theme="github-light"
								className="block dark:hidden"
							/>
						</TabsContent>
						<TabsContent
							value="actions"
							className="max-h-[500px] overflow-y-auto pt-2"
						>
							<CopyButton text={action} className="absolute right-2 -top-1" />
							<Code
								lang="tsx"
								className="hidden dark:block"
								code={action}
								theme="github-dark"
							/>
							<Code
								lang="tsx"
								className="block dark:hidden"
								code={action}
								theme="github-light"
							/>
						</TabsContent>
					</Tabs>
				</div>
				<div className="py-4 not-prose flex gap-12 flex-col">
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
						<SiteSettingsDomains defaultDomain="example.til.wiki" />
					</div>
					<div className="flex flex-col gap-2">
						<span className="text-lg font-semibold">
							Custom domain component Apex configuration
						</span>
						<SiteSettingsDomains defaultDomain="til.wiki" />
					</div>
					<div className="flex flex-col gap-2">
						<span className="text-lg font-semibold">
							Successfully added domain
						</span>
						<SiteSettingsDomains defaultDomain="tk.rhys.dev" />
					</div>
				</div>
			</DocsBody>
		</DocsPage>
	);
}
