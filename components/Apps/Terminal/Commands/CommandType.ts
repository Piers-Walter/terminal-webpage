import FakeFS from "../FileSystem/FakeFS";
import { cwdHandler } from "../TerminalExecutor";

export interface CommandInputs {
  args: string[],
  fs: FakeFS,
  environment: { [key: string]: string },
  cwdHandler: cwdHandler
}

export type TerminalCommand = { main: (inputs: CommandInputs) => string, man?: string };