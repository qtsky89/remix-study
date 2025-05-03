import { getStoredNotes, storeNotes } from "~/data/notes";
import NewNote, { links as newNoteLinks } from "../components/NewNote";
import NoteList, { links as noteListLinks } from "../components/NoteList";
import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

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

  const existingNotes = await getStoredNotes();
  noteData.id = new Date().toISOString();

  const updatedNotes = existingNotes.concat(noteData);

  await storeNotes(updatedNotes);
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 2000));

  return redirect("/notes");
}
