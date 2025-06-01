import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, V2_MetaFunction } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "@remix-run/react";
import sharedStyles from "~/styles/shared.css";
import Error from "./components/util/Error";
import { ReactNode } from "react";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "stylesheet", href: sharedStyles },
];

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

export function Document({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {title && <title>{title}</title>}
        <Meta />
        <Links />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function CatchBoundary() {
  const caughtResponse = useCatch();
  caughtResponse.statusText;

  return (
    <Document title={caughtResponse.statusText}>
      <main>
        <Error title={caughtResponse.statusText}>
          <p>
            {caughtResponse.data?.message ||
              "Something went wrong. Please try again later."}
          </p>
          <p>
            Back to <Link to="/">main1</Link>
          </p>
        </Error>
      </main>
    </Document>
  );
}

export function ErrorBoundary({ error }) {
  return (
    <Document title="An error occured">
      <main>
        <Error title="An error occured">
          <p>
            {error.message || "Something went wrong. Please try again later."}
          </p>
          <p>
            Back to <Link to="/">main2</Link>
          </p>
        </Error>
      </main>
    </Document>
  );
}

export function meta() {
  return {
    charset: "utf-8",
    title: "New remix app",
    viewport: "width=device-width,initial-scale=1",
  };
}

// export const meta: V2_MetaFunction = () => {
//   return [
//     {
//       name: "viewport",
//       content: "width=device-width,initial-scale=1",
//     },
//     { title: "New Remix App" },
//   ];
// };
