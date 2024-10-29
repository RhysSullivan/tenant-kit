import Link from "next/link";
import { SiteSettingsDomains } from "@tenant-kit/kit/domains/client";
import { Button } from "@tenant-kit/kit/components/ui/button";

export default async function HomePage() {
  // const recentDomains = await fetch(
  //   `https://api.vercel.com/v5/projects/${
  //     process.env.VERCEL_PROJECT_ID
  //   }/domains${
  //     process.env.VERCEL_TEAM_ID ? `?teamId=${process.env.VERCEL_TEAM_ID}` : ""
  //   }`,
  //   {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${process.env.VERCEL_AUTH_TOKEN}`,
  //       "Content-Type": "application/json",
  //     },
  //     next: {
  //       revalidate: 600,
  //     },
  //   }
  // ).then((res) => res.json());
  // console.log(recentDomains);
  return (
    <main className=" w-full px-4 ">
      <div className="pb-32 max-w-screen-lg mx-auto">
        <h1 className="text-2xl font-semibold pt-4">Tenant Kit</h1>
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
            <li className="pl-4">Custom domains i.e tenant.example.com</li>
            <li className="pl-4">Subpaths i.e example.com/tenant</li>
            <li className="pl-4">
              Using a custom domain as a handle i.e Bluesky (ATProtocol)
            </li>
          </ul>
          {/* Customization */}
          <h3 className="text-base font-semibold py-2">Customization</h3>
          <ul>
            <li className="pl-4">
              Supporting custom HTML, CSS, and JavaScript
            </li>
            <li className="pl-4">
              Adding built in support for most analytics providers
            </li>
          </ul>
          {/* Auth */}
          <h3 className="text-base font-semibold py-2">Authentication</h3>
          <ul>
            <li className="pl-4">
              Auth across subdomains, subpaths, and custom domains
            </li>
          </ul>
          {/* Hosting */}
          <h3 className="text-base font-semibold py-2">Hosting</h3>
          <ul>
            <li className="pl-4">Multi tenancy on Vercel</li>
            <li className="pl-4">Multi tenancy on Cloudflare</li>
            <li className="pl-4">Multi tenancy on a $5 VPS</li>
          </ul>
        </div>
       

        <SiteSettingsDomains />
        <div className="py-4">
          Interested in sponsoring the development of this project? Reach out on{" "}
          <a
            href="https://twitter.com/rhyssullivan"
            className="hover:underline text-blue-300"
            target="_blank"
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
