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

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
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
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor='user'>User name</FieldLabel>
                <Input
                  id='user'
                  type='text'
                  placeholder='User name'
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor='email'>Email</FieldLabel>
                <Input
                  id='email'
                  type='email'
                  placeholder='user@email.com'
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor='password'>Password</FieldLabel>
                <Input id='password' type='password' required />
              </Field>
              <Field>
                <Button type='submit'>Sign up</Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
