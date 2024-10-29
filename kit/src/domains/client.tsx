"use client";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

import { AlertCircle, CheckCircle2, XCircle, LoaderCircle } from "lucide-react";

import { useState } from "react";
import { useFormStatus } from "react-dom";

import { getDomainStatus, updateSite } from "./actions";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type DNSRecord = {
  type: string;
  name: string;
  value: string;
  ttl: string;
};

function DNSRecordDisplay({ record }: { record: DNSRecord }) {
  return (
    <div className="flex items-center justify-start space-x-10 overflow-x-scroll max-w-[80vw] bg-background p-4 rounded-md border-2 font-mono">
      <div>
        <p className="text-sm text-muted-foreground">Type</p>
        <p className="mt-2 text-sm">{record.type}</p>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">Name</p>
        <p className="mt-2 text-sm">{record.name}</p>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">Value</p>
        <p className="mt-2 text-sm">{record.value}</p>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">TTL</p>
        <p className="mt-2 text-sm">{record.ttl}</p>
      </div>
    </div>
  );
}

function useDomainStatus(domain: string) {
  const query = useQuery({
    queryKey: [`custom-domain-status-${domain}`],
    queryFn: () => getDomainStatus(domain),
    refetchInterval: 5000,
  });

  return {
    status: query.data?.status,
    domainJson: query.data?.domainJson,
    loading: query.isLoading,
  };
}

const getSubdomain = (name: string, apexName: string) => {
  if (name === apexName) return null;
  return name.slice(0, name.length - apexName.length - 1);
};

const InlineSnippet = ({
  className,
  children,
}: {
  className?: string;
  children: string;
}) => {
  return (
    <span
      className={cn(
        "inline-block rounded-md px-1 py-0.5 font-mono bg-primary-foreground",
        className
      )}
    >
      {children}
    </span>
  );
};

function DomainConfiguration(props: { domain: string }) {
  const { domain } = props;

  const { status, domainJson } = useDomainStatus(domain);

  if (!status || status === "Valid Configuration" || !domainJson) return null;

  const subdomain = getSubdomain(domainJson.name, domainJson.apexName);

  const txtVerification =
    (status === "Pending Verification" &&
      domainJson.verification.find((x: any) => x.type === "TXT")) ||
    null;
  if (txtVerification) {
    return (
      <div className="flex flex-col space-y-4">
        <p className="text-sm dark:text-white">
          Please set the following TXT record on{" "}
          <InlineSnippet>{domainJson.apexName}</InlineSnippet> to prove
          ownership of <InlineSnippet>{domainJson.name}</InlineSnippet>:
        </p>
        <div className="my-5 flex items-start justify-start space-x-10 rounded-md bg-stone-50 p-2 dark:bg-stone-800 dark:text-white">
          <div>
            <p className="text-sm font-bold">Type</p>
            <p className="mt-2 font-mono text-sm">{txtVerification.type}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Name</p>
            <p className="mt-2 font-mono text-sm">
              {txtVerification.domain.slice(
                0,
                txtVerification.domain.length - domainJson.apexName.length - 1
              )}
            </p>
          </div>
          <div>
            <p className="text-sm font-bold">Value</p>
            <p className="mt-2 font-mono text-sm">
              <span className="text-ellipsis">{txtVerification.value}</span>
            </p>
          </div>
        </div>
        <p className="text-sm dark:text-stone-400">
          Warning: if you are using this domain for another site, setting this
          TXT record will transfer domain ownership away from that site and
          break it. Please exercise caution when setting this record.
        </p>
      </div>
    );
  }
  if (status === "Unknown Error") {
    return (
      <p className="mb-5 text-sm dark:text-white">{domainJson.error.message}</p>
    );
  }
  return (
    <Tabs defaultValue="subdomain">
      <TabsList>
        <TabsTrigger value="subdomain">CNAME (Recommended)</TabsTrigger>
        <TabsTrigger value="apex">Apex</TabsTrigger>
      </TabsList>
      <TabsContent value="apex">
        <div className="flex flex-col gap-4 pt-4">
          <span className="text-sm">
            To configure your domain{" "}
            <InlineSnippet>{domainJson.apexName}</InlineSnippet>, 
             set the following A record on your DNS provider to continue:
          </span>
          <DNSRecordDisplay
            record={{
              type: "@",
              name: subdomain ?? "www",
              value: "76.76.21.21",
              ttl: "86400",
            }}
          />
        </div>
      </TabsContent>
      <TabsContent value="subdomain">
        <div className="flex flex-col gap-4 pt-4">
          <span className="text-sm">
            To configure your subdomain{" "}
            <InlineSnippet>{domainJson.name}</InlineSnippet>,{" "} set the following CNAME record on your DNS provider to continue:
          </span>
          <DNSRecordDisplay
            record={{
              type: "CNAME",
              name: subdomain ?? "www",
              value: `cname.${
                process.env.NEXT_PUBLIC_ROOT_DOMAIN ?? "vercel-dns.com"
              }`,
              ttl: "86400",
            }}
          />
        </div>
      </TabsContent>
      <div className="my-3 text-left">
        <p className="mt-5 text-sm dark:text-white">
          Note: for TTL, if <InlineSnippet>86400</InlineSnippet> is not
          available, set the highest value possible. Also, domain propagation
          can take up to an hour.
        </p>
      </div>
    </Tabs>
  );
}

function FormButton() {
  const { pending } = useFormStatus();
  return (
    <button
      className={cn(
        "flex h-8 w-32 items-center justify-center space-x-2 rounded-md border text-sm transition-all focus:outline-none sm:h-10",
        pending
          ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
          : "border-black bg-black text-white hover:bg-white hover:text-black dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800"
      )}
      disabled={pending}
      type="submit"
    >
      {pending ? <p>Pending...</p> : <p>Save Changes</p>}
    </button>
  );
}

function DomainStatus({ domain }: { domain: string }) {
  const { status, loading } = useDomainStatus(domain);
  if (loading) {
    return <LoaderCircle className="dark:text-white text-black animate-spin" />;
  }
  if (status === "Valid Configuration") {
    return (
      <CheckCircle2
        fill="#2563EB"
        stroke="currentColor"
        className="text-white dark:text-white"
      />
    );
  }
  if (status === "Pending Verification") {
    return (
      <AlertCircle
        fill="#FBBF24"
        stroke="currentColor"
        className="text-white dark:text-black"
      />
    );
  }
  if (status === "Domain Not Found") {
    return (
      <XCircle
        fill="#DC2626"
        stroke="currentColor"
        className="text-white dark:text-black"
      />
    );
  }
  return null;
}

export function SiteSettingsDomains() {
  const [domain, setDomain] = useState<string | null>(null);
  return (
    <Card className="flex flex-col space-y-6">
      <form
        onSubmit={async (event) => {
          event.preventDefault(); // Prevent form from reloading the page
          const data = new FormData(event.currentTarget);
          const domain = data.get("customDomain") as string;
          setDomain(domain);
          await updateSite(domain);
        }}
      >
        <CardHeader>
          <CardTitle>Custom Domain</CardTitle>
          <CardDescription>The custom domain for your site.</CardDescription>
        </CardHeader>
        <CardContent className="relative bg-background flex flex-row items-center justify-between w-full">
          <Input
            type="text"
            name="customDomain"
            placeholder={"example.com"}
            maxLength={64}
            className='max-w-sm bg-background'
          />
          <div className="flex items-center space-x-2">
          {domain && <DomainStatus domain={domain} />}
            
          <FormButton />
          </div>
        </CardContent>
        {domain && (
          <CardFooter className="border-t-2 border-muted pt-4">
            <DomainConfiguration domain={domain} />
          </CardFooter>
        )}
      </form>
    </Card>
  );
}
