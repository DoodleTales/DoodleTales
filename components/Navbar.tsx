'use client';

import { Navbar01 } from '@/components/ui/shadcn-io/navbar-01';
import DoodleTalesLogo from '@/public/DoodleTalesLogo.png';
import Image from 'next/image';
import DarkModeToggle from './DarkModeToggle';

import { DashboardClientProps } from '@/lib/types';

export default function Navbar({ isAuthenticated, user }: { isAuthenticated: boolean, user?: DashboardClientProps['user']; }) {
  return (
    <>
      {!isAuthenticated ?
        <Navbar01
          logo={<Image src={DoodleTalesLogo} alt='DoodleTales Logo' className='h-15 w-auto shrink-0' loading='eager'/>}
          logoHref='/'
          darkModeToggle={<DarkModeToggle scale={1} />}
        />
        :
        <Navbar01
          logo={<Image src={DoodleTalesLogo} alt='DoodleTales Logo' className='h-15 w-auto shrink-0' loading='eager'/>}
          logoHref='/'
          APIOptionsText='API Options'
          APIOptionsHref='/api-options'
          SignOutText='Sign Out'
          SignOutHref='/signout'
          user={user}
          darkModeToggle={<DarkModeToggle scale={1} />}
        />
      }
    </>
  );
}
