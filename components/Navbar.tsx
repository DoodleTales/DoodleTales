'use client';

import { Navbar01 } from '@/components/ui/shadcn-io/navbar-01';
import DoodleTalesLogo from '@/public/DoodleTalesLogo.png';
import Image from 'next/image';
import DarkModeToggle from './DarkModeToggle';
import { useRouter, usePathname } from 'next/navigation';
import { useTheme } from '@/app/context/themeContext';

import { GameClientProps } from '@/lib/types';

import { handleSignOut, handleGame } from '@/app/game/actions';

export default function Navbar({ isAuthenticated, user, isAPIOptionsDisabled = false, hasKey = false }: { isAuthenticated: boolean, user?: GameClientProps['user']; isAPIOptionsDisabled?: boolean; hasKey?: boolean; }) {

  const router = useRouter();
  const pathname = usePathname();
  const { setTheme } = useTheme();

  const handleAPIOptionsClick = () => {
    router.replace('/api-options');
  };

  const handleNewGame = () => {
    setTheme('');
    router.replace('/theme-provider');
  };

  return (
    <>
      {!isAuthenticated ?
        <Navbar01
          logo={<Image src={DoodleTalesLogo} alt='DoodleTales Logo' className='h-15 w-auto shrink-0' loading='lazy' sizes='256px'/>}
          logoHref='/'
          onSignOutClick={handleSignOut}
          darkModeToggle={<DarkModeToggle scale={1} />}
        />
        :
        <Navbar01
          logo={<Image src={DoodleTalesLogo} alt='DoodleTales Logo' className='h-15 w-auto shrink-0' loading='lazy' sizes='256px'/>}
          logoHref='/'
          GameText='Play'
          GameHref='/game'
          onGameClick={handleGame}

          NewGameText={pathname === '/game' ? 'New' : ''}
          onNewGameClick={pathname === '/game' ? handleNewGame : undefined}

          APIOptionsText='Options'
          APIOptionsHref='/api-options'
          onAPIOptionsClick={handleAPIOptionsClick}
          SignOutText='Sign Out'
          SignOutHref='/signout'
          onSignOutClick={handleSignOut}
          user={user}
          darkModeToggle={<DarkModeToggle scale={1} />}
          isAPIOptionsDisabled={isAPIOptionsDisabled}
          hasKey={hasKey}
        />
      }
    </>
  );
}
