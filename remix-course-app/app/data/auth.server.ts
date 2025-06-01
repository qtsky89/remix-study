import { prisma } from "./database.server";

export async function signup({email, password}) {
  const existingUser = prisma.user.findFirst({where: {email}})

  if (existingUser) {
    const error = new Error('User Email already exist')
    error.status = 422
    throw error
  }

  

  
}