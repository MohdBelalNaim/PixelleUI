export const JSSuggestions = {
  suggestions: [
    {
      label: "for",
      kind: 27,
      documentation: "for loop",
      insertText: `for (let i = 0; i < 10; i++) {\n\n}`,
    },
    {
      label: "foreach",
      kind: 27,
      documentation: "forEach loop",
      insertText: `array.forEach(value => {\n\tconsole.log(value);\n})`,
    },
    {
      label: "while",
      kind: 27,
      documentation: "while loop",
      insertText: `while(condition) {\n\t// do something\n}`,
    },
    {
      label: "filter",
      kind: 27,
      documentation: "filter data according to condition",
      insertText: `let array = [1, 2, 3]\narray.filter(elem => elem > 2); // [3]`,
    },
    {
      label: "map",
      kind: 27,
      documentation: "map data according to condition",
      insertText: `let array = [1, 2, 3]\narray.map(elem => elem * 2); // [2, 4, 6]`,
    },
    {
      label: "reduce",
      kind: 27,
      documentation: "reduce data in single value",
      insertText: `let array = [1, 2, 3]\narray.reduce((cur, acc) => cur + acc, 0); // 1+2+3 = 6`,
    },
    {
      label: "log",
      kind: 27,
      documentation: "console.log()",
      insertText: `console.log()`,
    },
    {
      label: "function",
      kind: 27,
      documentation: "Create a function",
      insertText: `function name() {\n\n}`,
    },
    {
      label: "query",
      kind: 27,
      documentation: "document.querySelector()",
      insertText: `document.querySelector()`,
    },
    {
      label: "queryAll",
      kind: 27,
      documentation: "document.querySelectorAll()",
      insertText: `document.querySelectorAll()`,
    },
  ],
};
