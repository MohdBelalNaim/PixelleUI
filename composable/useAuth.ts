import { API_URL } from "./useURLs";
import { useUser } from "./useUser";

const PROTECTED_PATHS = ["profile","create"];

export function useAuth() {
  const route = useRoute();
  const router = useRouter();
  const user = useUser();

  const userSession = localStorage.getItem("user");

  const cleanRoute = route.fullPath.split("/").filter((v) => v)[0];

  if (userSession) {
    fetch(API_URL + "user/", {
      method: "post",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res?.success) {
          user.value = res.success;
        }
      });
  } else if (!userSession && PROTECTED_PATHS.includes(cleanRoute)) {
    router.push("/auth");
  } else {
    router.push(route.fullPath);
  }

  watch(
    [user, () => route.fullPath],
    () => {
      const cleanRoute = route.fullPath.split("/").filter((v) => v)[0];

      if (user.value == null && PROTECTED_PATHS.includes(cleanRoute)) {
        router.push("/auth");
      } else if (user.value && route.fullPath.includes("/auth")) {
        router.push("/");
      } else {
        router.push(route.fullPath);
      }
    },
    {
      deep: true,
      immediate: true,
    }
  );
}

export function logout() {
  const user = useUser();
  localStorage.clear();
  user.value = null;
}
