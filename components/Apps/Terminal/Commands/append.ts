import type { TerminalCommand } from "./CommandType";

const touch: TerminalCommand = {
  main: ({ args, fs }) => {
    if (args.length < 2) { return "Enter a file name and contents to append\n" }

    const [filename, content] = [args[0], args.slice(1).join(" ")];
    const file = fs.getFile({ name: filename });
    file?.setContents({ contents: `${file?.getContents()}${content}` });
    return ""
  },
  man: `This command makes a new directory in the current directory`
}

export default touch