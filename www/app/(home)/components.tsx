"use client";
import { DomainStatus } from "@/components/domains/client";
import { useDomainStatus } from "@/components/domains/client";
import { Card } from "@/components/ui/card";

import { ExternalLink } from "lucide-react";
export function DomainStatusCard({ domain }: { domain: string }) {
	const status = useDomainStatus(domain);
	return (
		<Card className="p-4 flex flex-row gap-2 items-center justify-between">
			<a
				href={`https://${domain}`}
				target="_blank"
				className="hover:underline flex flex-row items-center justify-center gap-2"
				rel="noreferrer"
			>
				{domain}
				<ExternalLink className="w-4 h-4" />
			</a>
			<div className="flex flex-row gap-2 items-center justify-between w-[190px]">
				{status?.status}
				<DomainStatus domain={domain} />
			</div>
		</Card>
	);
}
