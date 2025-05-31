import { Form, Link, useFetcher, useSubmit } from "@remix-run/react";

function ExpenseListItem({ expenseId, title, amount }) {
  // const submit = useSubmit();
  const fetcher = useFetcher();
  function deleteExpenseItemHandler() {
    // submit(null, {
    //   method: "delete",
    //   action: `/expenses/${expenseId}`,
    // });

    const proceed = confirm("Are you sure? Do you want to delete this item?");
    if (!proceed) {
      return;
    }

    // dont do the navigation action if we use fecher instead
    fetcher.submit(null, {
      method: "delete",
      action: `/expenses/${expenseId}`,
    });
  }

  if (fetcher.state !== "idle") {
    return (
      <article className="expense-item locked">
        <p>Deleting...</p>
      </article>
    );
  }

  return (
    <article className="expense-item">
      <div>
        <h2 className="expense-title">{title}</h2>
        <p className="expense-amount">${amount.toFixed(2)}</p>
      </div>
      <menu className="expense-actions">
        <button onClick={deleteExpenseItemHandler}>Delete</button>
        {/* <Form method="delete" action={`/expenses/${expenseId}`}>
          <button>Delete</button>
        </Form> */}
        <Link to={expenseId}>Edit</Link>
      </menu>
    </article>
  );
}

export default ExpenseListItem;
