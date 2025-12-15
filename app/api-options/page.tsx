import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import APIOptions from '@/components/APIOptions';

export default async function APIOptionsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/');
  }

  return <APIOptions user={session.user} />;
}
