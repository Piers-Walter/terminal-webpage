import type { TerminalCommand } from "./CommandType";

const touch: TerminalCommand = {
  main: ({ args, fs, cwdHandler }) => {
    if (args.length < 2) { return "Enter a file name and contents to append\n" }
    const [filename, content] = [args[0], args.slice(1).join(" ")];
    let file = fs.getFile(cwdHandler.cwd + "/" + filename).fileHandle;
    if (!file) {
      const addFileResult = fs.addFile(cwdHandler.cwd, filename);
      if (!addFileResult.success || addFileResult.fileHandle == undefined) {
        return addFileResult.message || "Error creating file"
      }
      file = addFileResult.fileHandle
    }
    file?.setContents({ contents: `${file?.getContents()}${content}` });
    return ""
  },
  man: `This command makes a new directory in the current directory`
}

export default touch