export interface CommandInputs {
  args: string[]
}

export type TerminalCommand = (inputs: CommandInputs) => string;