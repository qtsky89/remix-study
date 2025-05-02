import { getStoredNotes, storeNotes } from "~/data/notes";
import NewNote, { links as newNoteLinks } from "../components/NewNote";
import { redirect } from "@remix-run/node";

export default function NotesPage() {
  return (
    <main>
      <NewNote />
    </main>
  );
}

export function links() {
  return [...newNoteLinks()];
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

  return redirect("/notes");
}
