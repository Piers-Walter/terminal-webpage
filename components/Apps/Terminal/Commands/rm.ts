import type { TerminalCommand } from "./CommandType";

const touch: TerminalCommand = {
  main: ({ args, fs }) => {
    if (args.length == 0) { return "Enter a file name to delete\n" }

    const success = fs.deleteFile({ filename: args[0] })
    if (!success) { return "Failed to delete file\n" }
    return ""
  },
  man: `This command deletes a file from the current folder`
}

export default touch