import yargs, { Argv } from "yargs";
import { hideBin } from "yargs/helpers";
import {
  createNewNote,
  getAllNotes,
  removeAllNotes,
  removeNote,
  findNotes,
} from "./notes";
import { NoteType } from "./db";

const listNotes = (notes: NoteType[]) => {
  notes.forEach(({ id, content, tags }) => {
    console.log(`id: ${id}`);
    console.log(`content: ${content}`);
    console.log(`tags: ${tags}`);
    console.log("\n");
  });
};

yargs(hideBin(process.argv))
  .command(
    "new <note>",
    "create a new note",
    (yargs) => {
      return yargs
        .positional("note", {
          type: "string",
          description: "The content of the note to create",
        })
        .positional("tags", {
          type: "string",
          description: "tags to add note to the note",
        });
    },
    async (argv) => {
      const tags = argv.tags ? argv.tags.split(",") : [];
      if (argv.note !== undefined) {
        const note = await createNewNote(argv.note, tags);
        console.log("New note added", note);
      } else {
        console.error("Invalid note provided.");
        return;
      }
    }
  )
  .option("tags", {
    alias: "t",
    type: "string",
    description: "tags to add note to the note",
  })
  .command(
    "all",
    "get all notes",
    () => {},
    async () => {
      const allNotes = await getAllNotes();
      listNotes(allNotes);
    }
  )
  .command(
    "find <filter>",
    "get matching notes",
    (yargs) => {
      return yargs.positional("filter", {
        describe:
          "The search term to filter notes by, will be applied to note.content",
        type: "string",
      });
    },
    async (argv) => {
      if (argv.filter !== undefined) {
        const filterNotes = await findNotes(argv.filter);
        listNotes(filterNotes);
      } else {
        console.log("Invalid filter string provided");
        return;
      }
    }
  )
  .command(
    "remove <id>",
    "remove a note by id",
    (yargs) => {
      return yargs.positional("id", {
        type: "number",
        description: "The id of the note you want to remove",
      });
    },
    async (argv) => {
      if (argv.id !== undefined) {
        const idToRemove = await removeNote(argv.id);
        console.log(idToRemove);
      } else {
        console.log("Provide number input");
      }
    }
  )
  .command(
    "clean",
    "remove all notes",
    () => {},
    async (argv) => {
      await removeAllNotes();
      console.log("db reseted");
    }
  )
  .demandCommand(1)
  .parse();
