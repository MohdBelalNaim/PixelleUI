const route = useRoute();
export function toggleSidebar(sidebarId: string) {
  watch(
    () => route.params,
    () => {
      (document.getElementById(sidebarId) as HTMLInputElement).checked = false;
    }
  );
}
