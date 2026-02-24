import type { TerminalCommand } from "./CommandType";

const rm: TerminalCommand = {
  main: ({ args, fs }) => {
    if (args.length == 0) { return "Enter a file name to delete\n" }

    const response = fs.deleteFile({ filename: args[0] })
    if (!response.success) { return `Failed to delete file\n${response.message}\n` }
    return ""
  },
  man: `This command deletes a file from the current folder`
}

export default rm