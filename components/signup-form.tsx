'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Field,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { signUp } from '@/app/services/auth';
import { useState } from 'react';
import Link from 'next/link';
import { SignUpSchema } from '@/lib/schemas';
import { ZodError } from 'zod';
import { toast } from 'sonner';

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function handleSubmit(formData: FormData) {
    setError(null);
    setSuccess(false);
    setFieldErrors({});

    const rawData = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      user: formData.get('user') as string,
    };

    try {
      SignUpSchema.parse(rawData);
      await signUp(formData);
      setSuccess(true);
    } catch (error:any) {
      toast.custom((t) => (
        <div className='bg-linear-to-r from-gradient-pink to-gradient-gold text-white p-4 rounded-lg shadow-lg'>
          <div className='flex items-center gap-2'>
            <div>
              <div className='font-semibold'>Error on sign up!</div>
              <div className='text-sm opacity-90'>Password must be at least 8 characters long and contain at least one uppercase, one lowercase, one number and one special character.</div>
            </div>
          </div>
        </div>
      ));
    }
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Sign up to DoodleTales</CardTitle>
          <CardDescription>
            Enter your information below to sign up to DoodleTales
          </CardDescription>
        </CardHeader>
        <CardContent>
          {success ? (
            <div className='text-green-600 text-center'>
              Sign up successful! You can now <Link href='/' className='underline'>log in</Link>.
            </div>
          ) : (
            <form action={handleSubmit}>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor='user'>User name</FieldLabel>
                  <Input
                    id='user'
                    name='user'
                    type='text'
                    placeholder='User name'
                    autoComplete='username'
                    required
                  />
                  {fieldErrors.user && <p className='text-red-500 text-sm mt-1'>{fieldErrors.user}</p>}
                </Field>
                <Field>
                  <FieldLabel htmlFor='email'>Email</FieldLabel>
                  <Input
                    id='email'
                    name='email'
                    type='email'
                    placeholder='user@email.com'
                    autoComplete='email'
                    required
                  />
                  {fieldErrors.email && <p className='text-red-500 text-sm mt-1'>{fieldErrors.email}</p>}
                </Field>
                <Field>
                  <FieldLabel htmlFor='password'>Password</FieldLabel>
                  <Input id='password' name='password' type='password' required autoComplete='new-password' />
                  {fieldErrors.password && <p className='text-red-500 text-sm mt-1'>{fieldErrors.password}</p>}
                </Field>
                {error && <div className='text-red-500 text-sm'>{error}</div>}
                <Field>
                  <Button type='submit'>Sign up</Button>
                </Field>
              </FieldGroup>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
