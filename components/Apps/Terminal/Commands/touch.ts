import type { TerminalCommand } from "./CommandType";

const touch: TerminalCommand = {
  main: ({ args, fs }) => {
    if (args.length == 0) { return "Enter a file name to create\n" }

    const command = fs.addFile({ filename: args[0] })
    if (!command.success) { return command.message + "\n" }
    return ""
  },
  man: `This command makes a new file in the current directory`
}

export default touch