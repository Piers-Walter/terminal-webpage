import type { TerminalCommand } from "../CommandType";

const echo: TerminalCommand = ({ args }) => {
  return args.join(" ")
}

export default echo