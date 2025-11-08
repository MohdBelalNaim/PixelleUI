export const useErrorMsg = () => useState<string>("message", () => "");
const message = useErrorMsg();
watch(message, () => {
  if (message.value.length) {
    setTimeout(() => {
      message.value = "";
    }, 3000);
  }
});
