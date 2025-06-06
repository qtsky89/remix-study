import { redirect } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { requireUserSession } from "~/data/auth.server";
import { addExpense } from "~/data/expenses.server";
import { validateExpenseInput } from "~/data/validation.server";

export default function View() {
  const navigate = useNavigate();
  return (
    <Modal onClose={() => navigate("..")}>
      <ExpenseForm />;
    </Modal>
  );
}

export async function action({ request }) {
  const userId = await requireUserSession(request);

  const formData = await request.formData();
  const expenseData = Object.fromEntries(formData);

  try {
    // validate the form data
    validateExpenseInput(expenseData);
  } catch (error) {
    console.error(error);
    return error;
  }

  await addExpense(expenseData, userId);
  return redirect("/expenses");
}
