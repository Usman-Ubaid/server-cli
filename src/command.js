import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import {
  createNewNote,
  getAllNotes,
  removeAllNotes,
  removeNote,
  findNotes,
} from "./notes.js";

const listNotes = (notes) => {
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
      return yargs.positional("note", {
        type: "string",
        description: "The content of the note to create",
      });
    },
    async (argv) => {
      const tags = argv.tags ? argv.tags.split(",") : [];
      const note = await createNewNote(argv.note, tags);
      console.log("New note added", note);
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
      const filterNotes = await findNotes(argv.filter);
      listNotes(filterNotes);
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
      const idToRemove = await removeNote(argv.id);
      console.log(idToRemove);
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
