import { prisma } from "./database.server";

export async function addExpense(expenseData, userId: string) {
  try {
  return await prisma.expense.create({data: {
    title: expenseData.title,
    amount: +expenseData.amount,
    date: new Date(expenseData.date),
    User: {connect: {id: userId}}
  }})  
  } catch (error) {
    console.log(error)
    throw new Error(`Failed to create expense.`)
  }
}

export async function getExpenses(userId: string) {
  if (!userId) {
    throw new Error(`Failed to fetch expenses.`)
  }

  try {
    return await prisma.expense.findMany({
      where: { userId: userId },
      orderBy: {date: 'desc'}}) 
  } catch (error) {
    console.log(error)
    throw new Error(`Failed to fetch expenses.`)
  }
}

export async function getExpense(expenseId: string) {
  try {
    return await prisma.expense.findFirst({where: {id: expenseId}})
  } catch (error) {
    console.log(error)
    throw new Error(`Failed to fetch expense. expenseId=${expenseId}`)
  }
}

export async function updateExpense(expenseId: string, expenseData) {
  try {
    return await prisma.expense.update({
      where: {id: expenseId},
      data: {
        title: expenseData.title,
        amount: +expenseData.amount,
        date: new Date(expenseData.date)
      }
    })
  } catch (error) {
    console.log(error)   
    throw error
  }
}

export async function deleteExpense(expenseId: string) {
  try {
    return await prisma.expense.delete({
      where: {id: expenseId},
    })
  } catch (error) {
    console.log(error)   
    throw new Error(`Failed to deleted expense. expenseId=${expenseId}`)
  }
}