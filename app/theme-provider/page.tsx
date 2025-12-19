import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import ThemeProvider from '@/components/ThemeProvider';
import { userValidated } from '@/app/api/auth/userValidation';

export default async function ThemeProviderPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/');
  }

  // Check if user exists in database
  const isValid = await userValidated();
  if (!isValid) {
    redirect('/');
  }

  return <ThemeProvider user={session.user} />;
}
