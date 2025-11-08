import { API_URL } from "./useURLs";
import { useUser } from "./useUser";
import { showAlert } from "./useAlert";

const user = useUser();
const email = user?.value?.email;
export function updatePassword(event: Event) {
  let formData = new FormData(event.target as HTMLFormElement);
  formData.append("email", email || "");
  let data = Object.fromEntries(formData.entries());
  fetch(API_URL + "edit-profile/password/", {
    method: "post",
    body: JSON.stringify({ ...data }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) showAlert(data.success);
      else showAlert(data.error, "error");
    });
}
export function updateLinks(event: Event) {
  let formData = new FormData(event.target as HTMLFormElement);
  formData.append("email", email || "");
  let data = Object.fromEntries(formData.entries());

  let links = {
    instagram: data?.instagram,
    twitter: data?.twitter,
    linkedin: data?.linkedin,
    other: data?.other,
  };

  const linksTostore = JSON.stringify(links);
  fetch(API_URL + "edit-profile/social-links/", {
    method: "post",
    body: JSON.stringify({ email: data?.email, links: linksTostore }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) showAlert(data.success);
      else showAlert(data.error, "error");
    });
}
export function updateBasicDetails(event: Event) {
  let formData = new FormData(event.target as HTMLFormElement);
  formData.append("email", email || "");
  let data = Object.fromEntries(formData.entries());
  fetch(API_URL + "edit-profile/basic-details/", {
    method: "post",
    body: JSON.stringify({ ...data }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) showAlert(data.success);
      else showAlert(data.error, "error");
    });
}
