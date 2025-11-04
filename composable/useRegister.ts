import { showAlert } from "./useAlert";
import { useErrorMsg } from "./useErrorMsg";
import { API_URL } from "./useURLs";
import { v4 as uuidv4 } from "uuid";

export const isLoading = ref<boolean>(false);

export function useRegister(event: Event) {
  const message = useErrorMsg();

  let formData = new FormData(event.target as HTMLFormElement);
  let data = Object.fromEntries(formData.entries());

  isLoading.value = true;

  fetch(API_URL + "auth/signup/", {
    method: "post",
    body: JSON.stringify({ ...data, id: uuidv4() }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data?.success) {
        showAlert(data.success);
        (event.target as HTMLFormElement).reset();
        useRouter().push("/auth");
      } else if (data?.error) {
        showAlert(data.error, "error");
      }
    })
    .finally(() => {
      isLoading.value = false;
    });

  return [isLoading];
}
