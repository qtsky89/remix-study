import { redirect } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { addExpense } from "~/data/expenses.server";

export default function View() {
  const navigate = useNavigate();
  return (
    <Modal onClose={() => navigate("..")}>
      <ExpenseForm />;
    </Modal>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const expenseData = Object.fromEntries(formData);
  console.log(formData, expenseData);

  await addExpense(expenseData);
  return redirect("/expenses");
}
