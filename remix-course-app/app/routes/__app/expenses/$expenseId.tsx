import { useNavigate, useParams } from "@remix-run/react";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { deleteExpense, updateExpense } from "~/data/expenses.server";
import { validateExpenseInput } from "~/data/validation.server";
import { redirect } from "@remix-run/node";
// import { getExpense } from "~/data/expenses.server";

export default function View() {
  const navigate = useNavigate();

  return (
    <Modal onClose={() => navigate("..")}>
      <ExpenseForm />;
    </Modal>
  );
}

// export async function loader({ params }) {
//   const expenseId = params.expenseId;

//   console.log("EXPENSE ID LOADER");
//   const expense = await getExpense(expenseId);
//   return expense;
// }

export async function action({ params, request }) {
  const expenseId = params.expenseId;

  if (request.method === "PUT") {
    const formData = await request.formData();
    const expenseData = Object.fromEntries(formData);

    try {
      // validate the form data
      validateExpenseInput(expenseData);
    } catch (error) {
      console.error(error);
      return error;
    }
    console.log("hoy?");
    await updateExpense(expenseId, expenseData);
  } else if (request.method === "DELETE") {
    await deleteExpense(expenseId);
  }
  return redirect("/expenses");
}
