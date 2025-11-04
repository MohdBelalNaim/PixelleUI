type AlertType = "success" | "error";

interface IAlert {
  type: AlertType;
  message: string;
}

export const alert = ref<IAlert>({
  message: "",
  type: "success",
});

export function showAlert(message: string, type: AlertType = "success") {
  alert.value.message = message;
  alert.value.type = type;
}

watch(
  alert,
  () => {
    if (alert.value.message) {
      setTimeout(() => {
        alert.value.message = "";
        alert.value.type = "success";
      }, 3000);
    }
  },
  {
    deep: true,
  }
);
