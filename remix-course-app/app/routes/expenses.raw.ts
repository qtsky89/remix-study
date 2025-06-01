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

import { getExpenses } from "~/data/expenses.server";

export function loader() {
  const expenses = getExpenses();

  return expenses;
}
