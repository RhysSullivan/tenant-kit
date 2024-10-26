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
        <div className='pt-12 flex flex-col'>

        <span >This site will cover the following topics:</span>
          {/* Domains */}
          <h3 className='text-lg font-semibold py-2'>Domains</h3>
          <ul>
            <li className='pl-4'>Custom domains i.e tenant.example.com</li>
            <li className='pl-4'>Subpaths i.e example.com/tenant</li>
          </ul>
          {/* Customization */}
          <h3 className='text-lg font-semibold py-2'>Customization</h3>
          <ul>
            <li className='pl-4'>Supporting custom HTML, CSS, and JavaScript</li>
            <li className='pl-4'>Adding built in support for most analytics providers</li>
          </ul>
          {/* Auth */}
          <h3 className='text-lg font-semibold py-2'>Authentication</h3>
          <ul>
            <li className='pl-4'>Auth across subdomains, subpaths, and custom domains</li>
          </ul>
        </div>
        <div className='pt-4'>
          Interested in sponsoring the development of this project? Reach out on 
          {" "}<a href='https://twitter.com/rhyssullivan' className='hover:underline text-blue-300' target='_blank'>Twitter</a> or contact me at <a href='mailto:rhys@fumadocs.com'>me@rhys.dev</a>
        </div>
      </div>
    </main>
  );
}
