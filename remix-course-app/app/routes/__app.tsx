import { Outlet } from "@remix-run/react";
import expenseStyles from "~/styles/expenses.css";

export default function View() {
  return <Outlet />;
}

export function links() {
  return [{ rel: "stylesheet", href: expenseStyles }];
}
