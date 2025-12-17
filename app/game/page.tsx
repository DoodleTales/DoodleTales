import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Game from '@/components/Game';
import { setTheme } from './actions';

export default async function GamePage(theme: string) {
  const session = await auth();

  if (!session?.user) {
    redirect('/');
  }

  setTheme(theme)
  return <Game user={session.user} />;
}
