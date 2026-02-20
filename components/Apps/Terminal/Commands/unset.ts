import type { TerminalCommand } from "./CommandType";

const usage = `Usage: unset KEY\n`

const unset: TerminalCommand = {
  main: ({ args, environment }) => {
    if (args.length == 0) {
      return `No arguments provided\n${usage}`
    }
    if (args.length > 1) {
      return `Too many arguments provided\n${usage}`
    }
    delete environment[args[0]]
    return ""
  },
  man: `This command will unset an environment variable`
}

export default unset