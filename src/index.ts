const splitLinesIntoArray = (s: string): string[] => s.split(/\n/g);

export const lineToLatex = (
  s: string
): string | { list: boolean; content: string } => {
  const itemMatch = s.match(/^\* (.+)/);
  if (itemMatch) {
    return { list: true, content: "  \\item " + itemMatch[1] };
  }

  return (
    s
      // italic
      .replace(/_([^_]+)_/g, "\\textit{$1}")
      // bold
      .replace(/\*\*([^\*]+)\*\*/g, "\\textbf{$1}")
      // link
      .replace(/\[([^\]]+)\]\(([^\)]+)\)/g, "\\href{$2}{$1}")
  );
};

export const toTex = (s: string) => {
  const arr = splitLinesIntoArray(s);

  let isList = false;

  return arr
    .map((x) => {
      const r = lineToLatex(x);

      if (typeof r !== "string") {
        if (isList === false) {
          isList = true;
          return ["\\begin{itemize}", r.content].join("\n");
        }

        return r.content;
      }

      if (isList === true) {
        isList = false;
        return ["\\end{itemize}", r].join("\n");
      }

      return r;
    })
    .join("\n");
};

export default toTex;
