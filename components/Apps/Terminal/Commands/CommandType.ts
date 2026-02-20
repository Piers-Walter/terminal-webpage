import FakeFS from "../FileSystem/FakeFS";

export interface CommandInputs {
  args: string[],
  fs: FakeFS,
  environment: { [key: string]: string }
}

export type TerminalCommand = { main: (inputs: CommandInputs) => string, man?: string };