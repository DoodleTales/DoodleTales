'use client';

import { Navbar01 } from '@/components/ui/shadcn-io/navbar-01';
import DoodleTalesLogo from '@/public/DoodleTalesLogo.png';
import Image from 'next/image';
import DarkModeToggle from './DarkModeToggle';

export default function Navbar({ isAuthenticated }: { isAuthenticated: boolean }) {
  return (
    <>
      {!isAuthenticated ?
        <Navbar01
          logo={<Image src={DoodleTalesLogo} alt='DoodleTales Logo' className='h-15 w-auto' />}
          logoHref='/'
          darkModeToggle={<DarkModeToggle scale={1} />}
        />
        :
        <Navbar01
          logo={<Image src={DoodleTalesLogo} alt='DoodleTales Logo' className='h-15 w-auto' />}
          logoHref='/'
          APIOptionsText='API Options'
          APIOptionsHref='/api-options'
          SignOutText='Sign Out'
          SignOutHref='/signout'
          darkModeToggle={<DarkModeToggle scale={1} />}
        />
      }
    </>
  );
}
