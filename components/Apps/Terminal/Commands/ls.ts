import type { TerminalCommand } from "./CommandType";
import { File, Folder } from "../FileSystem/FakeFS";
import checkFlags from "./commonUtils/checkFlags";

const supportedFlags = ["-l", "-a"];

const ls: TerminalCommand = {
  main: ({ fs, args }) => {
    const flagCheck = checkFlags({ flags: args, supportedFlags });
    if (flagCheck.success === false) return flagCheck.message;

    let contents = fs.readDir();

    if (args.indexOf("-a") == -1) {
      contents = contents.filter(node => {
        if (node.name.startsWith(".")) return null;
        return node;
      })
    }

    if (args.indexOf("-l") != -1) {
      return contents.map(node => {
        if (node instanceof Folder) return `📁 ${node.name}`
        else {
          return `📄 ${node.name}`
        }
      }).join("\n") + '\n'
    } else {
      return contents.map(node => node.name).join(" ") + '\n'
    }
  },
  man: `This command prints the contents current directory.
Flags:
  -l List contents in long format`
}

export default ls