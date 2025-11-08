export interface ICreateProject {
  title: string;
  tags: string[];
  css: string;
  html: string;
  javascript: string;
  id: string;
  visibility: "private" | "public";
  uploaded: boolean;
  fileLength: number;
  files?: string;
}
