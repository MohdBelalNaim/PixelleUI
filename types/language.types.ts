export type Languages = "html" | "css" | "javascript";

export interface FileType {
  editorId: number;
  filename: string;
  lang: Languages;
  isOpen: boolean;
}
