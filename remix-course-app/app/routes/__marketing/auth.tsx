import authStyles from "~/styles/auth.css";
import AuthForm from "~/components/auth/AuthForm";

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

  //login
  if (authMode === "login") {
  } else {
    //signin
  }
}
