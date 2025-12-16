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
import { Link } from 'lucide-react';

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  async function handleSubmit(formData: FormData) {
    setError(null);
    setSuccess(false);

    try {
      await signUp(formData);
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError('Failed to sign up. Please try again.');
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
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor='email'>Email</FieldLabel>
                  <Input
                    id='email'
                    name='email'
                    type='email'
                    placeholder='user@email.com'
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor='password'>Password</FieldLabel>
                  <Input id='password' name='password' type='password' required />
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
