import FakeFS from "../FileSystem/FakeFS";

export interface CommandInputs {
  args: string[],
  fs: FakeFS
}

export type TerminalCommand = { main: (inputs: CommandInputs) => string, man?: string };