import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const signupSchema = z.object({
  displayName: z.string().min(2, 'Name must be at least 2 characters').max(50),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  churchCode: z.string().length(8).optional().or(z.literal('')),
})

export const churchSchema = z.object({
  name: z.string().min(3, 'Church name must be at least 3 characters').max(100),
})

export const playerNameSchema = z.object({
  name: z.string().min(1, 'Name is required').max(20, 'Name too long'),
})

export type LoginInput = z.infer<typeof loginSchema>
export type SignupInput = z.infer<typeof signupSchema>
export type ChurchInput = z.infer<typeof churchSchema>
export type PlayerNameInput = z.infer<typeof playerNameSchema>
