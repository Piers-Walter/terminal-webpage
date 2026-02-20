import type { TerminalCommand } from "./CommandType";

const echo: TerminalCommand = {
  main: ({ args }) => {
    let newline = "\n"

    if (args[0] == "-n") {
      newline = ""
      args = args.slice(1)
    }

    return args.join(" ") + newline
  },
  man: `This command will print out its arguments`
}

export default echo