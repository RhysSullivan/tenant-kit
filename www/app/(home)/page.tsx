import Link from "next/link";
import { SiteSettingsDomains } from "@/components/domains/client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ExternalLinkIcon } from "lucide-react";

export default async function HomePage() {
	return (
		<main className=" w-full px-4 ">
			<div className="pb-32 max-w-screen-lg mx-auto">
				<h1 className="text-2xl font-semibold pt-4">
					Quickly build multi-tenant applications
				</h1>
				<h2 className="text-lg">
					A collection of documentation, components, and resources for building
					multi-tenant applications.
				</h2>
				<hr className="mt-4" />
				<div className="py-4 flex flex-col">
					<div className="text-base pb-2 ">
						This site will cover the following topics
					</div>
					{/* Domains */}
					<h3 className="text-base font-semibold py-2">Domains</h3>
					<ul>
						<li className="pl-4 flex items-center gap-2">
							<Checkbox checked={true} aria-readonly />
							<a href="/docs/custom-domain" className="hover:underline">
								Custom domains i.e tenant.example.com
							</a>
							<ExternalLinkIcon className="w-4 h-4" />
						</li>
						<li className="pl-4 flex items-center gap-2">
							<Checkbox aria-readonly checked={false} />
							Subpaths i.e example.com/tenant (🚧 Up next 🚧)
						</li>
						<li className="pl-4 flex items-center gap-2">
							<Checkbox aria-readonly checked={false} />
							Using a custom domain as a handle i.e Bluesky (ATProtocol)
						</li>
					</ul>
					{/* Customization */}
					<h3 className="text-base font-semibold py-2">Customization</h3>
					<ul>
						<li className="pl-4 flex items-center gap-2">
							<Checkbox aria-readonly checked={false} />
							Supporting custom HTML, CSS, and JavaScript
						</li>
						<li className="pl-4 flex items-center gap-2">
							<Checkbox aria-readonly checked={false} />
							Adding built in support for most analytics providers
						</li>
					</ul>
					{/* Auth */}
					<h3 className="text-base font-semibold py-2">Authentication</h3>
					<ul>
						<li className="pl-4 flex items-center gap-2">
							<Checkbox aria-readonly checked={false} />
							Auth across subdomains, subpaths, and custom domains
						</li>
					</ul>
					{/* Hosting */}
					<h3 className="text-base font-semibold py-2">Hosting</h3>
					<ul>
						<li className="pl-4 flex items-center gap-2">
							<Checkbox aria-readonly checked={false} />
							Multi tenancy on Vercel
						</li>
						<li className="pl-4 flex items-center gap-2">
							<Checkbox aria-readonly checked={false} />
							Multi tenancy on Cloudflare
						</li>
						<li className="pl-4 flex items-center gap-2">
							<Checkbox aria-readonly checked={false} />
							Multi tenancy on a $5 VPS
						</li>
					</ul>
				</div>
				<div className="pb-2 ">Try out the custom domain component below!</div>
				<SiteSettingsDomains />
				<div className="py-4">
					Interested in sponsoring the development of this project? Reach out on{" "}
					<a
						href="https://twitter.com/rhyssullivan"
						className="hover:underline text-blue-300"
						target="_blank"
						rel="noreferrer"
					>
						Twitter
					</a>{" "}
					or contact me at <a href="mailto:rhys@fumadocs.com">me@rhys.dev</a>
				</div>
				<div className="mx-auto w-full flex justify-center py-8">
					<Button asChild variant="outline">
						<Link
							href="https://github.com/rhyssullivan/tenant-kit"
							target="_blank"
						>
							Star on GitHub
						</Link>
					</Button>
				</div>
			</div>
		</main>
	);
}
