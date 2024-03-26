import { PrismaClient, User } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { blogUpdateZod, blogZod } from "@aayushkumar11092002/medium-common"
export const blogRoutes = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>();


blogRoutes.use(async (c, next) => {
    try {
        const jwt = c.req.header('Authorization');
        if (!jwt) {
            c.status(401);
            return c.json({ error: "unauthorized" });
        }
        const token = jwt.split(' ')[1];
        const payload = await verify(token, c.env.JWT_SECRET)
        if (!payload) {
            c.status(401);
            return c.json({ error: "unauthorized" });
        }
        c.set('userId', payload.id);
        await next()
    } catch (error) {
        console.log(error);
        return c.json({ error })
    }
});



blogRoutes.post('/', async (c) => {
    try {
        const prisma: PrismaClient = c.get("prisma")
        const userId = c.get('userId');
        console.log(userId);
        if (!userId) {
            c.status(403);
            return c.json({ msg: "unauthorized" })
        }
        const body = await c.req.json();
        const validField = blogZod.safeParse(body);
        if (!validField.success) {
            c.status(401)
            return c.json({ msg: "Enter all field" })
        }
        const { title, content } = validField.data
        const blogSaved = await prisma.post.create({
            data: {
                title,
                content,
                authorId: userId
            }
        })
        c.status(200)
        return c.json({ msg: "Blog Saved" })
    } catch (error) {
        console.log(error);
        return c.json({ error })
    }
})
blogRoutes.put('/', async (c) => {
    try {
        const prisma: PrismaClient = c.get("prisma")
        const body = await c.req.json();
        const validField = blogUpdateZod.safeParse(body);
        if (!validField.success) {
            c.status(401)
            return c.json({ msg: "Enter all field" })
        }
        const { title, content, id, published } = validField.data
        const blogSaved = await prisma.post.update({
            data: {
                title,
                published,
                content,
            },
            where: {
                id
            }
        })
        c.status(200)
        return c.json({ msg: "Blog Updated" })
    } catch (error) {
        console.log(error);
        return c.json({ error })
    }
})

blogRoutes.get('/all-bulk', async (c) => {
    try {
        const prisma = c.get("prisma")
        const userBlog = await prisma.post.findMany({})
        c.status(200)
        return c.json({ data: userBlog })
    } catch (error) {
        console.log(error);
        return c.json({ error })
    }
})

blogRoutes.get('/:id', async (c) => {
    try {
        const prisma: PrismaClient = c.get("prisma")
        const id = c.req.param("id")
        if (!id) {
            c.status(401)
            return c.json({ msg: "Blog not found" })
        }
        const blog = await prisma.post.findUnique({
            where: {
                id
            }
        })
        c.status(200)
        return c.json({ data: blog })
    } catch (error) {
        console.log(error);
        return c.json({ error })
    }
})