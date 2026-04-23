import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

export const signUpSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required"
    }),
    email: z.email("This is not valid email address"),
    password: z.string().min(8, { message: 'Password must contaion at least 8 characters' })
})

export type SignUpSchema = z.infer<typeof signUpSchema>
export const SignUpResolver = zodResolver(signUpSchema)