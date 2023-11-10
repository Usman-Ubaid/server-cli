# Server-CLI

Node.js server-side project to create CLI commands that can read and write from database. The commands can only be implemented in CLI.

> The project is built with the intention to learn about node.js.

## Features

- Adding a new note to database

```
note new "write the note here" --tags "write tags separated by commas"
```

- Getting notes from database

```
note all
```

- Filtering notes in database

```
note find "content of the note"
```

- Removing a note to database

```
note remove id of the note to be removed
```

- Resetting database

```
note clean
```

## Usage

### Install dependencies

```
npm install
```

### Run

- Open CLI
- Go to the folder/directory of the project
- Execute the command in the CLI:

```
npm link
```

- Execute the commands mentioned above.

## Author

- GitHub: [Usman-Ubaid](https://github.com/Usman-Ubaid)

## Acknowledgments

- GitHub: [Frontendmasters](https://github.com/FrontendMasters)
- GitHub: [Scott-Moss](https://github.com/Hendrixer)
