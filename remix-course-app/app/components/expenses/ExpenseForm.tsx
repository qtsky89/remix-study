import {
  Form,
  Link,
  useActionData,
  //useSubmit,
  useNavigation,
  //useLoaderData,
  useMatches,
  useParams,
} from "@remix-run/react";

function ExpenseForm() {
  const today = new Date().toISOString().slice(0, 10); // yields something like 2023-09-10
  const validationErrors = useActionData();
  // const submit = useSubmit();
  // const expenseData = useLoaderData();
  const params = useParams();

  const matches = useMatches();
  const expenses = matches?.find(
    (match) => match.id === "routes/__app/expenses"
  )?.data;
  const expenseData = expenses.find(
    (expense) => expense.id === params.expenseId
  );

  if (params.expenseId && !expenseData) {
    return <p>Invalid expense Id. {params.id}</p>;
  }

  const defaultValue = expenseData
    ? {
        title: expenseData.title,
        amount: expenseData.amount,
        date: expenseData.date,
      }
    : {
        title: "",
        amount: "",
        date: "",
      };

  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";

  return (
    <Form
      method={expenseData ? "put" : "post"}
      className="form"
      id="expense-form"
    >
      <p>
        <label htmlFor="title">Expense Title</label>
        <input
          type="text"
          id="title"
          name="title"
          required
          maxLength={30}
          defaultValue={defaultValue.title}
        />
      </p>

      <div className="form-row">
        <p>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            min="0"
            step="0.01"
            required
            defaultValue={defaultValue.amount}
          />
        </p>
        <p>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            max={today}
            required
            defaultValue={
              defaultValue.date ? defaultValue.date.slice(0, 10) : ""
            }
          />
        </p>
      </div>
      {validationErrors && (
        <ul>
          {Object.values(validationErrors).map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      <div className="form-actions">
        <button disabled={isSubmitting}>
          {isSubmitting ? "Saving" : "Save Expense"}
        </button>
        <Link to="..">Cancel</Link>
      </div>
    </Form>
  );
}

export default ExpenseForm;
