import type { TerminalCommand } from "./CommandType";
import { Folder } from "../FileSystem/FakeFS";
import checkFlags from "./commonUtils/checkFlags";

const supportedFlags = ["-l", "-a"];

const ls: TerminalCommand = {
  main: ({ fs, args, cwdHandler }) => {
    const flagCheck = checkFlags({ flags: args, supportedFlags });
    if (flagCheck.success === false) return flagCheck.message;

    const fsResults = fs.readDir(cwdHandler.cwd);
    if (fsResults.success == false) {
      return `Error: ${fsResults.message}\n`;
    }

    let contents = fsResults.directory;

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
      }).toSorted().join("\n") + '\n'
    } else {
      return contents.map(node => node.name).toSorted().join(" ") + '\n'
    }
  },
  man: `This command prints the contents current directory.
Flags:
  -l List contents in long format`
}

export default ls