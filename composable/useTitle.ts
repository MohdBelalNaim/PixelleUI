let params = useRoute().params;

export const useTitle = () =>
  useState("title", () => {
    return typeof params?.name == "string"
      ? params.name?.split("_")[1]
      : params.name?.at(0)?.split("_")[1];
  });
