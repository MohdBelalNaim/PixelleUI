import { showAlert } from "./useAlert";
import { API_URL } from "./useURLs";
import { useUser } from "./useUser";

export const isAuthenticating = ref<boolean>(false);

export function useLogin(event: Event) {
  const user = useUser();

  let formData = new FormData(event.target as HTMLFormElement);
  let data = Object.fromEntries(formData.entries());

  isAuthenticating.value = true;

  fetch(API_URL + "auth/login/", {
    method: "post",
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then(async (data) => {
      if (data?.success) {
        await nextTick();
        user.value = data.success;
        localStorage.setItem(
          "user",
          `${user.value?.email}|${user.value?.id}`
        );
        showAlert(data.success);
      } else if (data?.error) {
        showAlert(data.error, "error");
      }
    })
    .finally(() => {
      isAuthenticating.value = false;
    });

  return [isAuthenticating];
}
