import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { Globe } from "lucide-react";

/**
 * Shared layout configurations
 *
 * you can configure layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
	nav: {
		title: (
			<div className="flex flex-row items-center justify-center gap-2">
				<Globe className="w-4 h-4" />
				<span>Tenant Kit</span>
			</div>
		),
	},
	githubUrl: "https://github.com/rhyssullivan/tenant-kit",
	links: [
		{
			text: "Documentation",
			url: "/docs",
			active: "nested-url",
		},
	],
};
