"use server";

const validDomainRegex = new RegExp(
  /^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/
);

const VERCEL_PROJECT_ID = process.env.VERCEL_PROJECT_ID;
// optional
const VERCEL_TEAM_ID = process.env.VERCEL_TEAM_ID;
const VERCEL_AUTH_TOKEN = process.env.VERCEL_AUTH_TOKEN;

const addDomainToVercel = async (domain: string) => {
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
    }
  ).then((res) => res.json());
};

const removeDomainFromVercelProject = async (domain: string) => {
  return await fetch(
    `https://api.vercel.com/v9/projects/${VERCEL_PROJECT_ID}/domains/${domain}${
      VERCEL_TEAM_ID ? `?teamId=${VERCEL_TEAM_ID}` : ""
    }`,
    {
      headers: {
        Authorization: `Bearer ${VERCEL_AUTH_TOKEN}`,
      },
      method: "DELETE",
    }
  ).then((res) => res.json());
};

export const updateSite = async (domain: string) => {
  let response;

  if (domain.includes("vercel.pub")) {
    return {
      error: "Cannot use vercel.pub subdomain as your custom domain",
    };
    // if the custom domain is valid, we need to add it to Vercel
  }
  if (validDomainRegex.test(domain)) {
    console.log("Adding domain to Vercel");
    await Promise.all([
      addDomainToVercel(domain),
      // Optional: add www subdomain as well and redirect to apex domain
      // addDomainToVercel(`www.${value}`),
    ]);
    response = {
      success: "Custom domain added successfully",
    };
    // empty value means the user wants to remove the custom domain
  } else if (domain === "") {
    console.log("Removing domain from Vercel");
    await removeDomainFromVercelProject(domain);
  }
  console.log("response", response);
  return response;
};

export type DomainVerificationStatusProps =
  | "Valid Configuration"
  | "Invalid Configuration"
  | "Pending Verification"
  | "Domain Not Found"
  | "Unknown Error";
import { z } from "zod";

const DomainResponseSchema = z.object({
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
    })
  ),
});

export type DomainResponse = z.infer<typeof DomainResponseSchema>;

export const getDomainResponse = async (
  domain: string
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
    }
  ).then((res) => {
    return res.json();
  });
};
// From https://vercel.com/docs/rest-api/endpoints#get-a-domain-s-configuration
interface DomainConfigResponse {
  /** How we see the domain's configuration. - `CNAME`: Domain has a CNAME pointing to Vercel. - `A`: Domain's A record is resolving to Vercel. - `http`: Domain is resolving to Vercel but may be behind a Proxy. - `null`: Domain is not resolving to Vercel. */
  configuredBy?: ("CNAME" | "A" | "http") | null;
  /** Which challenge types the domain can use for issuing certs. */
  acceptedChallenges?: ("dns-01" | "http-01")[];
  /** Whether or not the domain is configured AND we can automatically generate a TLS certificate. */
  misconfigured: boolean;
}
export const getConfigResponse = async (
  domain: string
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
    }
  ).then((res) => res.json());
};

export const verifyDomain = async (domain: string): Promise<DomainResponse> => {
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
    }
  ).then((res) => res.json());
};

export async function getDomainStatus(domain: string) {
  let status: DomainVerificationStatusProps = "Valid Configuration";

  const [domainJson, configJson] = await Promise.all([
    getDomainResponse(domain),
    getConfigResponse(domain),
  ]);
  console.log(domainJson, configJson);

  if (domainJson?.error?.code === "not_found") {
    // domain not found on Vercel project
    status = "Domain Not Found";

    // unknown error
  } else if (domainJson.error) {
    status = "Unknown Error";

    // if domain is not verified, we try to verify now
  } else if (!domainJson.verified) {
    status = "Pending Verification";
    const verificationJson = await verifyDomain(domain);

    // domain was just verified
    if (verificationJson && verificationJson.verified) {
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
