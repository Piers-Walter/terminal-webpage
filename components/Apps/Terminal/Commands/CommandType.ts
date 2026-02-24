import FakeFS from "../FileSystem/FakeFS";


export interface CommandInputs {
  args: string[],
  fs: FakeFS,
  environment: { [key: string]: string },
  cwdHandler: { cwd: string, setCwd: (newCwd: string) => string }
}

export type TerminalCommand = { main: (inputs: CommandInputs) => string, man?: string };