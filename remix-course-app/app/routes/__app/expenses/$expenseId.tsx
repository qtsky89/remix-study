import { useNavigate } from "@remix-run/react";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { getExpense } from "~/data/expenses.server";

export default function View() {
  const navigate = useNavigate();

  return (
    <Modal onClose={() => navigate("..")}>
      <ExpenseForm />;
    </Modal>
  );
}

export async function loader({ params }) {
  const expenseId = params.expenseId;

  const expense = await getExpense(expenseId);
  return expense;
}
