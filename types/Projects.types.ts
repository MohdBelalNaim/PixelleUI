export interface Project {
  id: string;
  userid: string;
  files: string;
  name: string;
  tags: string;
  visibility: "public" | "private" | string; 
}
