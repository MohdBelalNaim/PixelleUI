import type { IProject } from "./projects.interface";

export const useProjects = () => useState<IProject[]>("projects", () => []);
