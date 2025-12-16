import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import ThemeProvider from '@/components/ThemeProvider';

export default async function ThemeProviderPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/');
  }

  return <ThemeProvider user={session.user} />;
}
