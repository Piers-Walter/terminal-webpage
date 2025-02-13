import type { TerminalCommand } from "../CommandType";

const echo: TerminalCommand = {
  main: ({ args }) => {
    return args.join(" ") + "\n"
  },
  man: `This command will print out its arguments`
}

export default echo