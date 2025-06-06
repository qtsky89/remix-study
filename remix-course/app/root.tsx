import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
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
import mainStyle from "./styles/main.css";
import MainNavigation from "./components/MainNavigation";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "stylesheet", href: mainStyle },
];

export function CatchBoundary() {
  const caughtResponse = useCatch();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <title>{caughtResponse.statusText}</title>
      </head>
      <body>
        <header>
          <MainNavigation></MainNavigation>
        </header>
        <main className="error">
          <h1>An error occurred</h1>
          <p>{caughtResponse.statusText}</p>
          <p>{caughtResponse.data?.message || "an error occured"}</p>
          <p>
            Back to <Link to="/">safety2</Link>
          </p>
        </main>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function ErrorBoundary({ error }) {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <title>An error occurred</title>
      </head>
      <body>
        <header>
          <MainNavigation></MainNavigation>
        </header>
        <main className="error">
          <h1>An error occurred2</h1>
          <p>{error.message}</p>
          <p>
            Back to <Link to="/">safety2</Link>
          </p>
        </main>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <MainNavigation></MainNavigation>
        </header>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function meta() {
  return [
    {
      charset: "utf-8",
      title: "New remix app",
      viewport: "width=device-width,initial-scale=1",
    },
  ];
}
