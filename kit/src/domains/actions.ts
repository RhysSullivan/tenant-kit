"use server";
import { z } from "zod";

// Wrap the Vercel API in a namespace to keep addDomain and getDomainStatus focused on their own logic
namespace VercelAPI {
	const VERCEL_PROJECT_ID = process.env.VERCEL_PROJECT_ID;
	const VERCEL_TEAM_ID = process.env.VERCEL_TEAM_ID;
	const VERCEL_AUTH_TOKEN = process.env.VERCEL_AUTH_TOKEN;

	const zDomainResponseSchema = z.object({
		name: z.string(),
		apexName: z.string(),
		projectId: z.string(),
		redirect: z.string().nullable().optional(),
		redirectStatusCode: z
			.union([z.literal(307), z.literal(301), z.literal(302), z.literal(308)])
			.nullable()
			.optional(),
		gitBranch: z.string().nullable().optional(),
		updatedAt: z.number().optional(),
		createdAt: z.number().optional(),
		verified: z.boolean(),
		verification: z.array(
			z.object({
				type: z.string(),
				domain: z.string(),
				value: z.string(),
				reason: z.string(),
			}),
		),
	});

	type DomainResponse = z.infer<typeof zDomainResponseSchema>;

	// https://vercel.com/docs/rest-api/endpoints#get-a-domain-s-configuration
	interface DomainConfigResponse {
		configuredBy?: ("CNAME" | "A" | "http") | null;
		acceptedChallenges?: ("dns-01" | "http-01")[];
		misconfigured: boolean;
	}

	export const getDomainResponse = async (
		domain: string,
	): Promise<DomainResponse & { error: { code: string; message: string } }> => {
		return await fetch(
			`https://api.vercel.com/v9/projects/${VERCEL_PROJECT_ID}/domains/${domain}${
				VERCEL_TEAM_ID ? `?teamId=${VERCEL_TEAM_ID}` : ""
			}`,
			{
				method: "GET",
				headers: {
					Authorization: `Bearer ${VERCEL_AUTH_TOKEN}`,
					"Content-Type": "application/json",
				},
			},
		).then((res) => {
			return res.json();
		});
	};

	export const addDomainToVercel = async (domain: string) => {
		return await fetch(
			`https://api.vercel.com/v10/projects/${VERCEL_PROJECT_ID}/domains${
				VERCEL_TEAM_ID ? `?teamId=${VERCEL_TEAM_ID}` : ""
			}`,
			{
				method: "POST",
				headers: {
					Authorization: `Bearer ${VERCEL_AUTH_TOKEN}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: domain,
					// Optional: Redirect www. to root domain
					// ...(domain.startsWith("www.") && {
					//   redirect: domain.replace("www.", ""),
					// }),
				}),
			},
		).then((res) => res.json());
	};

	export const getConfigResponse = async (
		domain: string,
	): Promise<DomainConfigResponse> => {
		return await fetch(
			`https://api.vercel.com/v6/domains/${domain}/config${
				VERCEL_TEAM_ID ? `?teamId=${VERCEL_TEAM_ID}` : ""
			}`,
			{
				method: "GET",
				headers: {
					Authorization: `Bearer ${VERCEL_AUTH_TOKEN}`,
					"Content-Type": "application/json",
				},
			},
		).then((res) => res.json());
	};

	export const verifyDomain = async (
		domain: string,
	): Promise<DomainResponse> => {
		return await fetch(
			`https://api.vercel.com/v9/projects/${VERCEL_PROJECT_ID}/domains/${domain}/verify${
				VERCEL_TEAM_ID ? `?teamId=${VERCEL_TEAM_ID}` : ""
			}`,
			{
				method: "POST",
				headers: {
					Authorization: `Bearer ${VERCEL_AUTH_TOKEN}`,
					"Content-Type": "application/json",
				},
			},
		).then((res) => res.json());
	};
}

type DomainVerificationStatusProps =
	| "Valid Configuration"
	| "Invalid Configuration"
	| "Pending Verification"
	| "Domain Not Found"
	| "Unknown Error";

export const addDomain = async (domain: string) => {
	if (domain.includes("vercel.pub")) {
		return {
			error: "Cannot use vercel.pub subdomain as your custom domain",
		};
	}

	await Promise.all([
		VercelAPI.addDomainToVercel(domain),
		// Optional: add www subdomain as well and redirect to apex domain
		// addDomainToVercel(`www.${value}`),
	]);

	return {
		success: "Custom domain added successfully",
	};
};

export async function getDomainStatus(domain: string) {
	let status: DomainVerificationStatusProps = "Valid Configuration";

	const [domainJson, configJson] = await Promise.all([
		VercelAPI.getDomainResponse(domain),
		VercelAPI.getConfigResponse(domain),
	]);

	if (domainJson?.error?.code === "not_found") {
		// domain not found on Vercel project
		status = "Domain Not Found";

		// unknown error
	} else if (domainJson.error) {
		status = "Unknown Error";

		// if domain is not verified, we try to verify now
	} else if (!domainJson.verified) {
		status = "Pending Verification";
		const verificationJson = await VercelAPI.verifyDomain(domain);

		// domain was just verified
		if (verificationJson?.verified) {
			status = "Valid Configuration";
		}
	} else if (configJson.misconfigured) {
		status = "Invalid Configuration";
	} else {
		status = "Valid Configuration";
	}

	return {
		status,
		domainJson,
	};
}
