import type { TerminalCommand } from "./CommandType";

const rmdir: TerminalCommand = {
  main: ({ args, fs, cwdHandler }) => {
    if (args.length == 0) { return "Enter a file name to delete\n" }

    const response = fs.deleteFolder(cwdHandler.cwd + "/" + args[0])
    if (!response.success) { return `Failed to delete folder\n${response.message}\n` }
    return ""
  },
  man: `This command deletes a file from the current folder`
}

export default rmdir