
import Navbar from '@/components/Navbar';
import { SignupForm } from '@/components/signup-form';

export default function SignupPage() {
  return (
    <div className='fixed flex min-h-screen flex-col w-full overflow-auto [scrollbar-width:none]'>
      <Navbar isAuthenticated={false}/>
      <div className='flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black'>
        <main className='flex min-h-screen w-full flex-col items-center justify-between bg-white dark:bg-black sm:items-start'>
          <div className='flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
            <div className='w-full max-w-sm'>
              <SignupForm/>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}