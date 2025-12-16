
import Navbar from '@/components/Navbar';
import { LoginForm } from '@/components/login-form';
import Image from 'next/image';
import DoodleTalesLogo from '@/public/DoodleTalesLogo.png';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { SupabaseService } from './services/supabase';

export default async function HomePage() {
  const session = await auth();

  if (session?.user?.email) {
    const user = await SupabaseService.getUserByEmail(session.user.email);

    if(user.ai_api_key) {
      redirect('/theme-provider');
    } else {
      redirect('/api-options');
    }
  }

  return (
    <div className='fixed flex min-h-screen flex-col w-full overflow-auto [scrollbar-width:none]'>
      <Navbar isAuthenticated={false}/>
      <div className='flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black'>
        <main className='flex min-h-screen w-full flex-col items-center justify-between bg-white dark:bg-black sm:items-start'>
          <div className='flex min-h-svh w-full items-center justify-center md:p-1 gap-20'>
            <div className='w-full max-w-sm'>
              <Image src={DoodleTalesLogo} alt='Logo' width={600} height={600} priority/>
            </div>
            <div className='w-full max-w-sm'>
              <div className='flex items-center flex-col gap-2 md:p-1'>
                <div className='w-full max-w-sm'>
                  <LoginForm />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
