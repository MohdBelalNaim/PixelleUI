<script setup lang="ts">
import { useUser } from "~/composable/useUser";
import { jwtDecode } from "jwt-decode";
import { v4 as uuidv4 } from "uuid";
import { API_URL } from "~/composable/useURLs";

import {
  GoogleSignInButton,
  type CredentialResponse,
} from "vue3-google-signin";

// handle success event
const handleLoginSuccess = async (response: CredentialResponse) => {
  const user = useUser();
  const { credential } = response;
  if (credential) {
    const decoded = jwtDecode(credential!);
    fetch(API_URL + "auth/google/", {
      method: "post",
      body: JSON.stringify({ ...decoded, id: uuidv4() }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success) {
          localStorage.setItem(
            "user",
            `${data.success.email}|${data.success.id}`
          );
          user.value = data?.success;
        }
      });
  }
};

// handle an error event
const handleLoginError = () => {
  console.error("Login failed");
};
</script>

<template>
  <GoogleSignInButton
    @success="handleLoginSuccess"
    @error="handleLoginError"
    class="mx-auto"
    shape="circle"
    type="icon"
  />

  <!-- <button
    :disabled="!isReady"
    @click="() => login()"
    class="p-2 border flex gap-2 text-black bg-white cursor-pointer items-center justify-center rounded-md hover:bg-blue-900 hover:text-white transition-colors disabled:bg-gray-400 disabled:border-gray-400 disabled:hover:text-black disabled:cursor-not-allowed"
  >
    <icon name="devicon:google" size="20px" /> Continue with Google
  </button> -->
</template>
