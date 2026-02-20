import type { TerminalCommand } from "./CommandType";

const env: TerminalCommand = {
  main: ({ environment }) => {
    return Object.keys(environment).map((key) => `${key}=${environment[key]}`)
      .toSorted((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }))
      .join("\n") + "\n"
  },
  man: `This command will print out the current shell environment`
}

export default env