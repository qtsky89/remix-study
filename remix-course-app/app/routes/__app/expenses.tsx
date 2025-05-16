import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { FaDownload, FaPlus } from "react-icons/fa";
import ExpensesList from "~/components/expenses/ExpensesList";
import { getExpenses } from "~/data/expenses.server";

export default function ExpensesLayout() {
  const expenses = useLoaderData();

  // it can be run in front, backend

  return (
    <>
      <Outlet />
      <main>
        <section id="expenses-actions">
          <Link to="add">
            <FaPlus />
            <span>Add Expense</span>
          </Link>
          <a href="/expenses/raw">
            <FaDownload />
            <span>Load Raw Data</span>
          </a>
        </section>

        <ExpensesList expenses={expenses} />
      </main>
    </>
  );
}

export async function loader() {
  const expenses = await getExpenses();
  // return expenses;
  return json(expenses);
}
