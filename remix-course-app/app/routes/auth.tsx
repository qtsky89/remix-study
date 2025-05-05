import authStyles from "~/styles/auth.css";
import AuthForm from "~/components/auth/AuthForm";

export default function View() {
  return <AuthForm />;
}

export function links() {
  return [{ rel: "stylesheet", href: authStyles }];
}
