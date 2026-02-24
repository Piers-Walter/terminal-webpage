import type { TerminalCommand } from "./CommandType";


const cd: TerminalCommand = {
  main: ({ args, fs, cwdHandler }) => {
    if (args.length == 0) args[0] = "/"
    let newPath = args[0]
    newPath = fs.resolvePath(cwdHandler.cwd, newPath)
    console.log(`newPath: ${newPath}`)

    const dirExists = fs.checkDirExists(newPath);
    if (dirExists) {
      cwdHandler.setCwd(newPath)
      return "\n"
    }
    return `Error: Directory ${args[0]} does not exist`
  },
  man: `This command changes the current directory`
}

export default cd