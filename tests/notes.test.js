import { jest } from "@jest/globals";

jest.unstable_mockModule("../src/db.js", () => ({
  insertDB: jest.fn(),
  getDB: jest.fn(),
  saveDB: jest.fn(),
}));

const { insertDB, getDB, saveDB } = await import("../src/db.js");
const { createNewNote, getAllNotes, removeNote } = await import(
  "../src/notes.js"
);

beforeEach(() => {
  insertDB.mockClear();
  getDB.mockClear();
  saveDB.mockClear();
});

test("createNewNote creates a new note and returns it", async () => {
  const note = {
    tags: ["serious"],
    content: "This is a new note",
    id: 1,
  };

  insertDB.mockResolvedValue(note);
  const result = await createNewNote(note.content, note.tags);

  expect(result.content).toEqual(note.content);
  expect(result.tags).toEqual(note.tags);
});

test("getAllNotes returns all the notes", async () => {
  const db = {
    notes: ["note1", "note2", "note3"],
  };

  getDB.mockResolvedValue(db);

  const result = await getAllNotes();
  expect(result).toEqual(db.notes);
});

test("removeNote does nothing if id is not found", async () => {
  const notes = [
    { id: 1, content: "This is note 1", tags: ["serious"] },
    { id: 2, content: "This is note 2", tags: ["severe"] },
    { id: 3, content: "This is note 3", tags: ["easy"] },
  ];

  saveDB.mockResolvedValue(notes);
  const idToRemove = 4;
  const result = await removeNote(idToRemove);
  expect(result).toEqual(undefined);
});
