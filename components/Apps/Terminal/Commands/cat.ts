import type { TerminalCommand } from "./CommandType";

const cat: TerminalCommand = {
  main: ({ args, fs }) => {
    if (args.length == 0) { return "Enter a file name to read\n" }

    const getFile = fs.getFile({ name: args[0] });
    if (!getFile) return `File not found: ${args[0]}\n`
    return getFile.getContents() + "\n";
  },
  man: `This command makes a new directory in the current directory`
}

export default cat