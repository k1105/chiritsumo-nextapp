export const asciiInterpolator = (t: number, begin: string, end: string) => {
  const currentTxtLength = Math.min(
    begin.length * (1 - t) + end.length * t,
    Math.max(begin.length, end.length)
  );
  let str = "";
  for (let i = 0; i < currentTxtLength; i++) {
    str +=
      i < begin.length
        ? String.fromCharCode(
            Math.floor(
              begin.charCodeAt(i) * (1 - t) + end.charCodeAt(i % end.length) * t
            )
          )
        : String.fromCharCode(
            Math.floor(12354 * (1 - t) + end.charCodeAt(i) * t)
          );
  }

  return str;
};
