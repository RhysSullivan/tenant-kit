import Link from 'next/link';
import { SiteSettingsDomains } from '@tenant-kit/kit/domains/client';

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col py-4 text-left">
      <div className='mx-auto'>
        <h1 className='text-2xl font-semibold'>Tenant Kit</h1>
        <h2>A collection of documentation, components, and resources for building multi-tenant applications.</h2>
        <div className='pt-32'>

        <SiteSettingsDomains />
        </div>
      </div>
    </main>
  );
}
