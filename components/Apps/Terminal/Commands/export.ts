import type { TerminalCommand } from "./CommandType";

const usage = `Usage: export KEY=VALUE\n`

const export_cmd: TerminalCommand = {
  main: ({ args, environment }) => {
    if (args.length == 0) {
      return `No arguments provided\n${usage}`
    }
    if (args.length > 1) {
      return `Too many arguments provided\n${usage}`
    }
    const envsplit = args[0].split("=")
    if (envsplit.length != 2) {
      return `Invalid syntax\n${usage}`
    }
    environment[envsplit[0]] = envsplit[1]
    return ""
  },
  man: `This command will set an environment variable`
}

export default export_cmd