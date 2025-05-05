import authStyles from "~/styles/auth.css";

export default function View() {
  return <h1>auth</h1>;
}

export function links() {
  return [{ rel: "stylesheet", href: authStyles }];
}
