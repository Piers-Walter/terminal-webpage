export default {
  backspace: (userInput: string) => {
    if (userInput.length == 1) return ""
    return userInput.slice(0, userInput.length - 1)
  }
}