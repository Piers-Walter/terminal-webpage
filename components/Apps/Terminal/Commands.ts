interface commandsInterface {
  [key: string]: ((args: string[]) => string)
}

const commands: commandsInterface = {
  "echo": (args: string[]): string => {
    return "ECHO WAS CALLED with args " + args
  }
}

export default commands;