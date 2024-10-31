"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

if (typeof window !== "undefined") {
	// biome-ignore lint/style/noNonNullAssertion: <explanation>
	posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		person_profiles: "identified_only", // or 'always' to create profiles for anonymous users as well
		api_host: "/ingest",
		ui_host: "https://us.i.posthog.com",
	});
}
export function CSPostHogProvider({ children }: { children: ReactNode }) {
	return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
const queryClient = new QueryClient();

export default function Providers({ children }: { children: ReactNode }) {
	return (
		<QueryClientProvider client={queryClient}>
			<CSPostHogProvider>{children}</CSPostHogProvider>
		</QueryClientProvider>
	);
}
