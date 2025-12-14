import { SignInButtonGithub } from '@/components/ui/signin-button-github';
import Navbar from '@/components/Navbar';
import Page from './login/page';
import { LoginForm } from '@/components/login-form';

export default function HomePage() {
  return (
    <div className='fixed flex min-h-screen flex-col w-full overflow-auto [scrollbar-width:none]'>
      <Navbar isAuthenticated={false}/>
      <div className='flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black'>
        <main className='flex min-h-screen w-full flex-col items-center justify-between bg-white dark:bg-black sm:items-start'>
          <div className='flex min-h-svh w-full items-center justify-center md:p-1'>
            <div className='w-full max-w-sm'>
              <div className='flex items-center flex-col gap-2 md:p-1'>
                  <div className='w-full max-w-sm'>
                    <LoginForm />
                  </div>
                  <SignInButtonGithub /> 
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
