import { Hono } from "hono"
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { signInZod, signUpZod } from "@aayushkumar11092002/medium-common"
export const userRoutes = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>();
userRoutes.post('/signup', async (c) => {
    try {
        const prisma: PrismaClient = c.get("prisma")
        const body = await c.req.json();
        const validField = signUpZod.safeParse(body)
        if (!validField.success) {
            return c.json({ msg: "Enter all field" })
        }
        const { email, password } = validField.data
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if (user) {
            return c.json({ msg: "User Already Exist" })
        }
        const userData = await prisma.user.create({
            data: {
                email,
                password
            }
        })
        const token = await sign({ id: userData.id }, c.env.JWT_SECRET)
        return c.json({ token })
    } catch (error) {
        console.log(error);
        return c.json({ error })
    }
})

userRoutes.post('/signin', async (c) => {
    try {
        const prisma: PrismaClient = c.get("prisma")
        const body = await c.req.json();
        const validField = signInZod.safeParse(body)
        if (!validField.success) {
            return c.json({ msg: "Enter all field" })
        }
        const { email } = validField.data
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if (!user) {
            return c.json({ msg: "User not found" })
        }
        const token = await sign({ id: user.id }, c.env.JWT_SECRET);
        return c.json({ token })
    } catch (error) {
        return c.json({ error })
    }
})