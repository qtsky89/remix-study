import { prisma } from "./database.server";
import { compare, hash } from "bcryptjs";

export async function signup({email, password}) {
  const existingUser = await prisma.user.findFirst({where: {email}})

  if (existingUser) {
    const error = new Error('User Email already exist')
    error.status = 422
    throw error
  }

  const passwordHash = await hash(password, 12)

  await prisma.user.create({data: {email: email, password: passwordHash}})

}

export async function login({email, password}) {
  const existingUser = await prisma.user.findFirst({where: {email}})

  if (!existingUser) {
    const error = new Error('User Email is not exist')
    error.status = 401
    throw error
  }

  const passwordCorrect = await compare(password, existingUser.password)

  if (!passwordCorrect) {
    const error = new Error('Password is not correct')
    error.status = 401
    throw error
  }

}