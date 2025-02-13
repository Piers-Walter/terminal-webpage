export interface CommandInputs {
  args: string[]
}

export type TerminalCommand = { main: (inputs: CommandInputs) => string, man?: string };