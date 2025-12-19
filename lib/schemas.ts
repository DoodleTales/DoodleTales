import { z } from 'zod';

export const SignUpSchema = z.object({
  email: z.email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password must include a special character')
    .regex(/[A-Z]/, 'Password must include at least one uppercase letter')
    .regex(/[a-z]/, 'Password must include at least one lowercase letter')
    .regex(/[0-9]/, 'Password must include at least one number'),
  user: z.string().min(2, 'Name must be at least 2 characters'),
});

export type SignUpInput = z.infer<typeof SignUpSchema>;
