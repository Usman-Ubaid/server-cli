import { insertDB, saveDB, getDB } from "./db.js";

type NoteType = {
  tags: string[];
  id: number;
  content: string;
};

export const createNewNote = async (note: string, tags: string[]) => {
  const newNote = {
    tags,
    id: Date.now(),
    content: note,
  };

  await insertDB(newNote);
  return newNote;
};

export const getAllNotes = async () => {
  const { notes }: { notes: NoteType[] } = await getDB();
  return notes;
};

export const findNotes = async (filter: string) => {
  const { notes }: { notes: NoteType[] } = await getDB();
  return notes.filter((note) =>
    note.content.toLowerCase().includes(filter.toLowerCase())
  );
};

export const removeNote = async (id: number) => {
  const notes = await getAllNotes();
  const match = notes.find((note) => note.id === id);

  if (match) {
    const newNotes = notes.filter((note) => note.id !== id);
    await saveDB({ notes: newNotes });
    return id;
  } else {
    console.log("No match found.");
  }
};

export const removeAllNotes = () => saveDB({ notes: [] });
