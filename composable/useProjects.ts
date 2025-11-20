import { ref } from "vue";
import { API_URL } from "./useURLs";

export interface Project {
  id: string;
  userid: string;
  files: string;
  name: string;
  tags: string;
  visibility: string;
  index_html?: string | null;
  style_css?: string | null;
}

export interface ProjectsResponse {
  success: Project[];
}

const projects = ref<Project[]>([]);

export function useProjects() {
  return {
    projects,
    async getMyProjects(userId: string) {
      const res = await fetch(API_URL + "projects/my/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      const data = (await res.json()) as ProjectsResponse;
      console.log(data)
      projects.value = data.success || [];
    },
  };
}
