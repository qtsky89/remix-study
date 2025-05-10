import { Outlet } from "@remix-run/react";
import ExpensesHeader from "~/components/navigation/ExpensesHeader";
import expenseStyles from "~/styles/expenses.css";

export default function View() {
  return (
    <>
      <ExpensesHeader />
      <Outlet />;
    </>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: expenseStyles }];
}
