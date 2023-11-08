import yargs from "yargs";
import { hideBin } from "yargs/helpers";

yargs(hideBin(process.argv))
  .command(
    "new <url>",
    "creates a new note",
    (yargs) => {
      return yargs.positional("note", {
        type: "string",
        description: "The content of the note",
      });
    },
    (argv) => {
      console.log("New note added: ");
    }
  )
  .demandCommand(1)
  .parse();
