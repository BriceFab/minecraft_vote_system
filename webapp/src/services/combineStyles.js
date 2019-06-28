// https://codesandbox.io/embed/merge-multiple-styles-qow51
function combineStyles(...styles) {
  return function CombineStyles(theme) {
    const outStyles = styles.map(arg => {
      if (typeof arg === "function") {
        return arg(theme);
      }
      return arg;
    });

    return outStyles.reduce((acc, val) => Object.assign(acc, val));
  };
}
export default combineStyles;  