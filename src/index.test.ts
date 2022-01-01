import * as I from "./index";

test("line to latex", () => {
  expect(
    I.lineToLatex(
      "my normal _line_, this is **bold** and here is a [link](https://example.com)"
    )
  ).toEqual(
    "my normal \\textit{line}, this is \\textbf{bold} and here is a \\href{https://example.com}{link}"
  );

  expect(I.lineToLatex("* list item")).toEqual("\\item list item");
});

test("to latex", () => {
  expect(
    I.toTex(`intro
* item 1
* item 2
and some new text`)
  ).toEqual("");
});
