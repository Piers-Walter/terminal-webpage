import type { TerminalCommand } from "./CommandType";

const cat: TerminalCommand = {
  main: ({ args, fs, cwdHandler }) => {
    if (args.length == 0) { return "Enter a file name to read\n" }

    const getFile = fs.getFile(cwdHandler.cwd + "/" + args[0]);
    if (!getFile.success || !getFile.fileHandle) return `${getFile.message}\n`
    return getFile.fileHandle.getContents() + "\n";
  },
  man: `This command makes a new directory in the current directory`
}

export default cat