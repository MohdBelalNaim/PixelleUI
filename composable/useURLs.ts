export const API_URL =
  import.meta.env.MODE == "development"
    ? "http://localhost/pixelle/api/"
    : "https://api.pixelle.dev/api/";

export const FILE_URL =
  import.meta.env.MODE == "development"
    ? "http://localhost/pixelle/ui/"
    : "https://api.pixelle.dev/ui/";
