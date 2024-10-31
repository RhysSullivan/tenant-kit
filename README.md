# Tenant Kit

A toolkit for building multi-tenant applications. The goal of this project is to provide components, documentation, and utilities for handling custom domains, authentication, and customization across multiple tenants.

This is a highly work in progress project being built in public, it will be incomplete and there will be lots of iteration.

Open issues, PRs, and tweet feedback at me to make this better.



## Features

- Custom domain management
  - Subdomain support (tenant.example.com)
  - Subpath support (example.com/tenant)
  - Custom domain verification and configuration
  - Automatic DNS record validation
- Authentication across subdomains and custom domains
- Built-in analytics provider support
- Multi-tenant hosting support for:
  - Vercel
  - Cloudflare
  - VPS deployments

## Project Structure

```
.
├── kit/            # Core components and utilities
├── www/            # Documentation and demo site
```


## Getting Started

1. Install dependencies:
```bash
pnpm install
```


2. Run the development server:
```bash
pnpm dev
```


3. Open [http://localhost:3000](http://localhost:3000) to view the documentation.

## Documentation

The documentation site is built using [Fumadocs](https://fumadocs.vercel.app) and includes:

- Component examples
- API documentation
- Integration guides
- Deployment instructions

## Environment Variables

Required environment variables for domain management:

```
VERCEL_PROJECT_ID=
VERCEL_TEAM_ID=
VERCEL_AUTH_TOKEN=
NEXT_PUBLIC_ROOT_DOMAIN=
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## License

This project is private and not currently available for public use.

## Support

For support or sponsorship inquiries:
- Twitter: [@rhyssullivan](https://twitter.com/rhyssullivan)
- Email: me@rhys.dev

## Tech Stack

- Next.js 15.0.0
- React (Canary)
- TypeScript
- Tailwind CSS
- Radix UI
- React Query
- Fumadocs

The project uses a monorepo structure with PNPM workspaces for package management.