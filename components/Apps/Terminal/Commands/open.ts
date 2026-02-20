import type { TerminalCommand } from "./CommandType";

const opens = [{
  arg: "blog",
  url: "https://blog.pierswalter.co.uk"
},
{
  arg: "card",
  url: "https://card.pierswalter.co.uk"
}]

const helpText = `Please specify a page to open. Options are:\n ${opens.map(o => o.arg).join(", ")}\n`

const open: TerminalCommand = {
  main: ({ args }) => {
    if (args[0] === undefined) return helpText;
    const open = opens.find(o => o.arg === args[0])
    if (!open) return helpText;
    window.open(open.url, "_blank");
    return "\n"
  },
  man: `This command opens a link in a new tab`
}

export default open