const checkFlags = ({ flags, supportedFlags }: { flags: string[], supportedFlags: string[] }): { success: boolean, message: string } => {
  const unsupportedFlags = flags.filter(flag => !supportedFlags.includes(flag));
  if (unsupportedFlags.length > 0) {
    return { success: false, message: `Error: unsupported flags ${unsupportedFlags.join(", ")}, supported flags are ${supportedFlags.join(", ")}\n` };
  }
  return { success: true, message: "" };
}

export default checkFlags