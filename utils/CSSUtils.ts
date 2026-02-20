export const getHighestZIndex = () => {
  let highest = 0;
  const windows = document.querySelectorAll<HTMLElement>(".window");
  for (const window of windows) {
    if (parseInt(window.style.zIndex) > highest) {
      highest = parseInt(window.style.zIndex);
    }
  }
  return highest;
};