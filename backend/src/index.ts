import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono'
import { blogRoutes } from './routes/blog'
import { userRoutes } from './routes/user'
import { cors } from 'hono/cors'
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>()
app.use("/*",cors());
app.use("*", async (c,next) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    c.set("prisma", prisma)
    return next();
  } catch (error) {
    console.log(error);
    return c.json({ error })
  }
})
app.route("/api/v1/user",userRoutes)
app.route("/api/v1/blog",blogRoutes)

export default app


