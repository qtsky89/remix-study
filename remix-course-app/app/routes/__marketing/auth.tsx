import authStyles from "~/styles/auth.css";
import AuthForm from "~/components/auth/AuthForm";
import { validateCredentials } from "~/data/validation.server";
import { signup } from "~/data/auth.server";
import { redirect } from "@remix-run/node";

export default function View() {
  return <AuthForm />;
}

export function links() {
  return [{ rel: "stylesheet", href: authStyles }];
}

export async function action({ request }) {
  const formData = await request.formData();

  const searchParams = new URL(request.url).searchParams;
  const authMode = searchParams.get("mode") || "login";

  const credentials = Object.fromEntries(formData);

  try {
    // validate user input
    validateCredentials(credentials);
  } catch (error) {
    return error;
  }

  try {
    //login
    if (authMode === "login") {
    } else {
      await signup(credentials);
      return redirect("/expenses");
    }
  } catch (error) {
    if (error.status === 422) {
      return { crendentials: error.message };
    }
  }
}
