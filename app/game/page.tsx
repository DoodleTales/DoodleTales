import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Game from '@/components/Game';
import { userValidated } from '@/app/api/auth/userValidation';

export default async function GamePage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/');
  }

  // Check if user exists in database
  const isValid = await userValidated();
  if (!isValid) {
    redirect('/');
  }

  return <Game user={session.user} />;
}
