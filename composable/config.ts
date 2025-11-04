import { editor, languages } from "monaco-editor";
import EditorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import HTMLWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import CSSWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import JSONWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import TSWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import { htmlSuggestions } from "./suggestions/HTML";
import { CSSSuggestions } from "./suggestions/css";

self.MonacoEnvironment = {
  getWorker: function (_, label) {
    switch (label) {
      case "json":
        return new JSONWorker();
      case "css":
      case "scss":
      case "less":
        return new CSSWorker();
      case "html":
        return new HTMLWorker();
      case "typescript":
      case "javascript":
        return new TSWorker();
      default:
        return new EditorWorker();
    }
  },
};

export function createEditor(element: HTMLElement, lang: string) {
  let codeEditor = editor.create(element, {
    automaticLayout: true,
    "semanticHighlighting.enabled": true,
    copyWithSyntaxHighlighting: true,
    fontLigatures: true,
    fontFamily: "cascadia code",
    fontSize: 16,
    suggestOnTriggerCharacters: true,
    formatOnPaste: true,
    formatOnType: true,
  });
  editor.setTheme("vs-dark");
  editor.setModelLanguage(codeEditor.getModel()!, lang);
  return codeEditor;
}

function registerSuggestions(language: string, suggestions: Object) {
  languages.registerCompletionItemProvider(language, {
    provideCompletionItems: function (): any {
      return suggestions;
    },
  });
}

registerSuggestions("html", htmlSuggestions);
registerSuggestions("css", CSSSuggestions);
