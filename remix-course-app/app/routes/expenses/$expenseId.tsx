import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";

export default function View() {
  return (
    <Modal>
      <ExpenseForm />;
    </Modal>
  );
}
