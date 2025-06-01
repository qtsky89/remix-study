// const DUMMY_EXPENSES = [
//   {
//     id: "id1",
//     title: "First Expense",
//     amount: 12.99,
//     date: new Date().toISOString(),
//   },
//   {
//     id: "id2",
//     title: "Second Expense",
//     amount: 6.99,
//     date: new Date().toISOString(),
//   },
// ];

import { requireUserSession } from "~/data/auth.server";
import { getExpenses } from "~/data/expenses.server";

export async function loader({request}) {
  const userId = await requireUserSession(request);
  const expenses = await getExpenses(userId);

  return expenses;
}
