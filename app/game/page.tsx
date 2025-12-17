import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Game from '@/components/Game';

export default async function GamePage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/');
  }

  return <Game user={session.user} />;
}
