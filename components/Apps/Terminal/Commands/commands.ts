import { TerminalCommand } from "./CommandType"

import echo from "./echo"
import pwd from "./pwd"
import help from "./help"
import man from "./man"
import open from "./open"
import ls from "./ls"
import cd from "./cd"
import mkdir from "./mkdir"
import touch from "./touch"
import cat from "./cat"
import append from "./append"
import rm from "./rm"
import env from "./env"
import export_cmd from "./export"
import unset from "./unset"

export const commands: Record<string, TerminalCommand> = {
  echo,
  pwd,
  help,
  man,
  open,
  ls,
  cd,
  mkdir,
  touch,
  cat,
  append,
  rm,
  env,
  export: export_cmd, // export is a reserved keyword
  unset
}