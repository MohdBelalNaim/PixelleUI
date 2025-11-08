import { API_URL } from "~/composable/useURLs";
import type { ICreateProject } from "./create.interface";
import { v4 as uuidv4 } from "uuid";
import { showAlert } from "~/composable/useAlert";
import { useUser } from "~/composable/useUser";

const htmlTemplate = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>

</body>

</html>`;

const css = `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html, body {
    height: 100%;
}

body {
    background-color: #030712;
    display: grid;
    place-items: center;
    color: whitesmoke;
}`;

const defaultValue: ICreateProject = {
  id: "",
  title: "",
  tags: [],
  css: css,
  html: htmlTemplate,
  javascript: "// write your javascript here",
  visibility: "private",
  uploaded: false,
  fileLength: 1,
};

export const projectStore = ref<ICreateProject>({ ...defaultValue });

export const result = computed(() => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${projectStore.value.title}</title>
    <style>
${projectStore.value.css}
    </style>
</head>
<body>
  ${projectStore.value.html}
  <script>
    ${projectStore.value.javascript}
  </script>
</body>
</html>`;
});

watch(
  () => projectStore.value.id,
  async (newId, oldId) => {
    await nextTick();
    if (newId == oldId) return;
    Object.assign(projectStore.value, {
      ...defaultValue,
      id: newId,
    });
  }
);

export function createNewProject() {
  const router = useRouter();
  const user = useUser();
  if (user.value) {
    router.push(`/create/${uuidv4()}?new=true`);
  } else {
    router.push("/auth");
  }
}

// function createFile(name = "index.html", code = result.value) {
//   const blob = new Blob([code], { type: "text/plain" });
//   let file = new File([blob], name, {
//     type: "text/plain",
//     lastModified: Date.now(),
//   });

//   return file;
// }

export const isSaving = ref(false);

export function saveFile() {
  if (!projectStore.value.title.trim().length) {
    showAlert("Project should have a name!", "error");
    return;
  }

  isSaving.value = true;
  const formData = new FormData();
  formData.append("name", projectStore.value.title);
  formData.append("id", projectStore.value.id);
  formData.append("visibility", projectStore.value.visibility);

  if (projectStore.value.tags.length) {
    formData.append("tags", projectStore.value.tags.join(","));
  }

  if (
    projectStore.value.html?.trim() &&
    projectStore.value.html != defaultValue.html
  ) {
    formData.append("html", projectStore.value.html);
  }
  if (projectStore.value.css?.trim()) {
    formData.append("css", projectStore.value.css);
  }
  if (
    projectStore.value.javascript.trim() &&
    projectStore.value.javascript != defaultValue.javascript
  ) {
    formData.append("js", projectStore.value.javascript);
  }

  fetch(`${API_URL}project/update/`, {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      if (data?.success) {
        showAlert(data.success.message);
        projectStore.value.uploaded = true;
      } else {
        showAlert(data.error, "error");
      }
    })
    .finally(() => (isSaving.value = false));
}

export const isDeletingFile = ref(false);
export function deleteFile() {
  isDeletingFile.value = true;
  let id = projectStore.value.id;
  fetch(`${API_URL}project/delete/?id=${id}`)
    .then((res) => res.json())
    .then(async (data) => {
      if (data?.success) {
        await nextTick();
        showAlert(data.success.message);
        Object.assign(projectStore.value, {
          ...defaultValue,
          id,
        });
        useRouter().push("/create/67a72cbd179ac?new=true");
        window.location.reload();
      } else {
        showAlert(data.error, "error");
      }
    })
    .finally(() => (isDeletingFile.value = false));
}
