import { prisma } from "./database.server";

export async function addExpense(expenseData) {
  try {
  return await prisma.expense.create({data: {
    title: expenseData.title,
    amount: +expenseData.amount,
    date: new Date(expenseData.date),
  }})  
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getExpenses() {
  try {
    return await prisma.expense.findMany({orderBy: {date: 'desc'}}) 
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getExpense(expenseId: string) {
  try {
    return await prisma.expense.findFirst({where: {id: expenseId}})
  } catch (error) {
    console.log(error)
    throw error
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
    throw error
  }
}