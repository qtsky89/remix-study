import { getStoredNotes, storeNotes } from "~/data/notes";
import NewNote, { links as newNoteLinks } from "../components/NewNote";
import NoteList, { links as noteListLinks } from "../components/NoteList";
import { json, redirect } from "@remix-run/node";
import { Link, useCatch, useLoaderData } from "@remix-run/react";

export default function NotesPage() {
  const notes = useLoaderData();

  return (
    <main>
      <NewNote />
      <NoteList notes={notes} />
    </main>
  );
}

export function links() {
  return [...newNoteLinks(), ...noteListLinks()];
}

export async function loader() {
  const notes = await getStoredNotes();
  if (!notes || notes.length === 0) {
    // throw new Response();
    throw json(
      {
        message: "coulnd't find any notes.",
      },
      {
        status: 404,
        statusText: "not found",
      }
    );
  }

  return notes;
  // return new Response(JSON.stringify(notes), {headers: {'Content-Type': 'application/json'}})
  // return json(notes);
}

export async function action({ request }) {
  const formData = await request.formData();
  /*
  const noteData = {
    title: formData.get("title"),
    content: formData.get("content"),
  };*/

  const noteData = Object.fromEntries(formData);
  // TODO. validation
  if (noteData.title.trim().length < 5) {
    return { message: "Invalid title - must be at least 5 characters long." };
  }

  const existingNotes = await getStoredNotes();
  noteData.id = new Date().toISOString();

  const updatedNotes = existingNotes.concat(noteData);

  await storeNotes(updatedNotes);
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 2000));

  return redirect("/notes");
}

export function ErrorBoundary({ error }) {
  return (
    <main className="error">
      <h1>An error occurred</h1>
      <p>{error.message}</p>
      <p>
        Back to <Link to="/">safety</Link>
      </p>
    </main>
  );
}

export function CatchBoundary() {
  const caughtResponse = useCatch();

  const message = caughtResponse.data?.message || "Data not found.";

  return (
    <main>
      <NewNote></NewNote>
      <p className="info-message">{message}</p>
    </main>
  );
}
