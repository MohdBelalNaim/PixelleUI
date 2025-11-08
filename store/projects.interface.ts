export interface IProject {
  id: string;
  userid: string;
  files: string;
  name: string;
  tags: string;
  user: string;
  picture: string;
  visiblity: "public" | "private";
}
