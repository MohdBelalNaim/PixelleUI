<script setup lang="ts">
import { useErrorMsg } from "~/composable/useErrorMsg";
import { useLogin, isAuthenticating } from "~/composable/useLogin";
const message = useErrorMsg();
</script>

<template>
  <section class="bg grid md:grid-cols-[3fr_2fr]">
    <div
      class="hidden md:grid relative place-content-center max-sm:justify-items-center max-sm:text-center gap-6 min-h-screen p-8"
    >
      <img src="/logo.svg" class="w-20 mb-3" />
      <div class="text-5xl leading-[1.3] font-medium">Welcome back!</div>
      <p class="max-w-2xl text-lg">
        Pixelle is a powerful, intuitive component library designed to
        streamline your development process and deliver stunning, responsive
        UIs. Empower your team to create without limits.
      </p>
    </div>

    <div id="login" class="grid place-items-center min-h-screen p-8">
      <form
        class="max-w-[400px] w-full grid gap-4"
        @submit.prevent="useLogin"
        id="loginForm"
      >
        <h1 class="text-3xl font-medium">Sign In</h1>

        <div class="input-group">
          <label for="">Email</label>
          <input type="email" name="email" placeholder="john@example.com" required/>
        </div>

        <div class="input-group">
          <label for="">Password</label>
          <input type="password" name="password" placeholder="Password" required/>
        </div>

        <Button
          :loading="isAuthenticating"
          class="rounded-md text-gray-100 py-2.5 mt-2"
          >Sign In</Button
        >

        <small class="text-red-400 empty:hidden">{{ message }}</small>

        <Separator />

        <LoginWithGoogle />

        <p>
          Don't have an account?
          <NuxtLink to="/auth/register">Create now</NuxtLink>
        </p>
      </form>
    </div>
  </section>
</template>

<style scoped>
form {
  border-radius: 16px;
  backdrop-filter: blur(4px);
}

.input-group {
  display: grid;
  gap: 6px;

  input {
    padding: 8px;
    border-radius: 6px;
    background-color: transparent;
    border: 2px solid;
  }
}
</style>
