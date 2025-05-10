import { useNavigate } from "@remix-run/react";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";

export default function View() {
  const navigate = useNavigate();
  return (
    <Modal onClose={() => navigate("..")}>
      <ExpenseForm />;
    </Modal>
  );
}
