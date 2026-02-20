export default {
  backspace: (fullInput: string, PS1: string) => {
    const lines = fullInput.split("\n");
    const lastLine = lines[lines.length - 1];
    if (lastLine.length > PS1.length) {
      lines[lines.length - 1] = lines[lines.length - 1].slice(0, lines[lines.length - 1].length - 1)
    }
    return lines.join("\n")
  }
}