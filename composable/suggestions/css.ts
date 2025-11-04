export const CSSSuggestions = {
  suggestions: [
    {
      label: "reset",
      kind: 27,
      documentation: "Reset default padding, margin and box-sizing",
      insertText: `* {
\tbox-sizing: border-box;
\tmargin:0;
\tpadding:0;
}

html, body {
\theight: 100%;
}`,
    },
  ],
};
