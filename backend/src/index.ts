import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono'
import { blogRoutes } from './routes/blog'
import { userRoutes } from './routes/user'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>()

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



// DATABASE_URL = "prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiMTM5YmFhMTEtYTdjNS00MzBjLWFhNTktODhiZTVhZDg1MjViIiwidGVuYW50X2lkIjoiMjJhOTYzNDRmZmFjMzJmYzQ4MTQzOWMyMzY1ZmM2Mzg3ZWM3MjI5M2MyMzUzNWE0OTFiYmQxMzU1ZjBjOTcyZCIsImludGVybmFsX3NlY3JldCI6IjI3YWY4OTU3LTFjMzQtNDBjMS1iM2U0LTY0MjY4OGJkYzdkNyJ9.mvw-TVzdVRhjytIfqeRpV1-11IMPKP8q4o77uUfcFnY"