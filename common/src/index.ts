
import * as z from "zod"

export const signUpZod = z.object({
    email: z.string(),
    password: z.string()
})
export const signInZod = z.object({
    email: z.string().email()
})

export const blogZod = z.object({
    title: z.string(),
    content: z.string(),
})


export const blogUpdateZod = z.object({
    id: z.string(),
    title: z.optional(z.string()),
    published: z.optional(z.boolean()),
    content: z.optional(z.string()),
})



export type SignUpZod = z.infer<typeof signUpZod>;
export type BlogZod = z.infer<typeof blogZod>;
export type SignInZod = z.infer<typeof signInZod>;
export type BlogUpdateZod = z.infer<typeof blogUpdateZod>;
