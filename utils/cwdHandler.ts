const cwdHandler = () => {
  let currentCwd = "/";

  return {
    get cwd() {
      return currentCwd;
    },
    setCwd: (newCwd: string) => {
      currentCwd = newCwd;
      return currentCwd;
    }
  };
};

export default cwdHandler;