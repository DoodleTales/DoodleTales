'use client';

import { Button } from '@/components/ui/button';
import { FaGithub } from 'react-icons/fa';
import { signInWithGithub } from '@/app/actions/auth';

export function SignInButtonGithub() {
  return (
    <Button
      onClick={() => signInWithGithub()}
      className='w-full flex items-center justify-center gap-2 mt-4'
    >
      <FaGithub />
      Login with GitHub
    </Button>
  );
}