'use client';

import { Navbar01 } from '@/components/ui/shadcn-io/navbar-01';
import DoodleTalesLogo from '@/public/DoodleTalesLogo.png';
import Image from 'next/image';
import DarkModeToggle from './DarkModeToggle';

import { DashboardClientProps } from '@/lib/types';

import { handleSignOut } from '@/app/dashboard/actions';

export default function Navbar({ isAuthenticated, user, isAPIOptionsDisabled = false }: { isAuthenticated: boolean, user?: DashboardClientProps['user']; isAPIOptionsDisabled?: boolean; }) {
  return (
    <>
      {!isAuthenticated ?
        <Navbar01
          logo={<Image src={DoodleTalesLogo} alt='DoodleTales Logo' className='h-15 w-auto shrink-0' priority/>}
          logoHref='/'
          onSignOutClick={handleSignOut}
          darkModeToggle={<DarkModeToggle scale={1} />}
        />
        :
        <Navbar01
          logo={<Image src={DoodleTalesLogo} alt='DoodleTales Logo' className='h-15 w-auto shrink-0' priority/>}
          logoHref='/'
          APIOptionsText='API Options'
          APIOptionsHref='/api-options'
          SignOutText='Sign Out'
          SignOutHref='/signout'
          onSignOutClick={handleSignOut}
          user={user}
          darkModeToggle={<DarkModeToggle scale={1} />}
          isAPIOptionsDisabled={isAPIOptionsDisabled}
        />
      }
    </>
  );
}
