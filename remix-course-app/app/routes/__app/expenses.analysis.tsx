import ExpenseStatistics from "~/components/expenses/ExpenseStatistics";
import Chart from "~/components/expenses/Chart";
import { getExpenses } from "~/data/expenses.server";
import { useCatch, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import Error from "~/components/util/Error";
import { requireUserSession } from "~/data/auth.server";

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

export default function View() {
  const expenses = useLoaderData();

  return (
    <main>
      <Chart expenses={expenses} />
      <ExpenseStatistics expenses={expenses} />
    </main>
  );
}

export async function loader({ request }) {
  const userId = await requireUserSession(request);

  const expenses = await getExpenses(userId);

  if (!expenses || expenses.length === 0) {
    throw json(
      { message: "Couldnt load expenses for the request analysis." },
      {
        status: 404,
        statusText: "Expenses not found",
      }
    );
  }

  return expenses;
}

export function CatchBoundary() {
  const caughtResponse = useCatch();

  return (
    <main>
      <Error title={caughtResponse.statusText}>
        <p>
          {caughtResponse.data?.message ||
            "Something went wrong. Coulnd't fetch expenses"}
        </p>
      </Error>
    </main>
  );
}
