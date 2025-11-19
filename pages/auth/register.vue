<script setup lang="ts">
import { useErrorMsg } from "~/composable/useErrorMsg";
import { useRegister, isLoading } from "~/composable/useRegister";
const message = useErrorMsg();

const password = ref("");
const confirmPassword = ref("");

const isPasswordValid = computed(() => {
  return password.value == confirmPassword.value;
});
</script>

<template>
  <section class="bg grid md:grid-cols-[3fr_2fr]">
    <div
      class="hidden md:grid relative place-content-center max-sm:justify-items-center max-sm:text-center gap-6 min-h-screen p-8"
    >
      <img src="/logo.svg" class="w-20 mb-3" />
      <div class="text-5xl leading-[1.3] font-medium">Welcome to Pixelle!</div>
      <p class="max-w-2xl text-lg">
        Pixelle is a powerful, intuitive component library designed to
        streamline your development process and deliver stunning, responsive
        UIs. Empower your team to create without limits.
      </p>
    </div>

    <div id="login" class="grid place-items-center min-h-screen p-8">
      <form class="max-w-[400px] w-full grid gap-4" @submit.prevent="useRegister">
        <h1 class="text-3xl font-medium">Sign Up</h1>

        <div class="input-group">
          <label for="">Full name</label>
          <input type="text" placeholder="John Doe" name="name" required />
        </div>

        <div class="input-group">
          <label for="">Email</label>
          <input
            type="email"
            name="email"
            placeholder="john@example.com"
            required
          />
        </div>

        <div class="input-group">
          <label for="">Password</label>
          <input
            type="password"
            name="password"
            v-model="password"
            :class="{
              valid: isPasswordValid,
              invalid: !isPasswordValid,
            }"
            placeholder="********"
            required
          />
        </div>

        <div class="input-group">
          <label for="">Confirm Password</label>
          <input
            type="password"
            v-model="confirmPassword"
            :class="{
              valid: isPasswordValid,
              invalid: !isPasswordValid,
            }"
            placeholder="********"
            required
          />
        </div>

        <Button
          :loading="isLoading"
          class="rounded-md text-gray-100 py-2.5 mt-2"
          >Sign Up</Button
        >

        <small class="text-red-400 empty:hidden">{{ message }}</small>

        <LoginWithGoogle />

        <p>
          Already have an account?
          <NuxtLink to="/auth">Sign In</NuxtLink>
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
    border: 2px solid white;

    &:valid.valid {
      border-color: seagreen;
    }

    &.invalid {
      border-color: tomato;
    }
  }
}
</style>
