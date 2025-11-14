<script setup lang="ts">
import { useTitle } from "~/composable/useTitle";

definePageMeta({
  layout: "custom",
});

const title = useTitle();
title.value = "Get Started";

const { data: html } = await useAsyncData(() =>
  queryCollection("content").path("/html").first()
);

const { data: css } = await useAsyncData(() =>
  queryCollection("content").path("/css").first()
);

const { data: js } = await useAsyncData(() =>
  queryCollection("content").path("/js").first()
);
</script>

<template>
  <section class="p-8 grid">
    <h2 class="text-2xl font-semibold">Getting Started</h2>
    <p>
      Welcome to <strong>Pixelle</strong>, the pixel-perfect component library
      for modern apps. Follow these steps to integrate and showcase your
      components seamlessly.
    </p>

    <h2 class="text-xl font-semibold mt-6">Prerequisites</h2>
    <ul class="list-disc list-inside">
      <li>
        Ensure you have an <strong>account</strong> on the platform where you
        plan to upload your component.
      </li>
      <li>A code editor like <strong>VS Code</strong>.</li>
      <li>A browser to preview your component.</li>
    </ul>

    <h2 class="text-2xl font-semibold my-6">
      Steps to Create and Upload Your Component
    </h2>

    <h3>1. Create an HTML File</h3>
    <p>
      Start by creating an <code class="">index.html</code> file where your
      component will be placed.
    </p>

    <ContentRenderer v-if="html" :value="html" />
    <div v-else>HTML not found</div>

    <h3>2. Create a CSS File</h3>
    <p>Style your component by creating a style.css file.</p>

    <ContentRenderer v-if="css" :value="css" />
    <div v-else>CSS not found</div>

    <h3>3. Add JavaScript (if needed)</h3>
    <p>If your component requires interactivity, create a script.js file.</p>

    <ContentRenderer v-if="js" :value="js" />
    <div v-else>JS not found</div>

    <h3>4. Connect Everything</h3>
    <p>
      Ensure that your index.html links to your style.css and script.js files
      correctly.
    </p>

    <h3>5. Upload to Your Website Log in to your platform.</h3>
    <p>
      Upload your index.html, style.css, and script.js files. Preview and test
      your component.
    </p>

    <div class="bg-green-800/20 p-4 rounded-md mt-8 max-w-3xl">
      <h3 class="mb-2">Tip</h3>
      <ul>
        <li>
          ✅ Keep your component centered to ensure it looks attractive in the
          output panel.
        </li>
        <li>
          ✅ Use clean and well-structured code to maintain readability and
          reusability.
        </li>
        <li>✅ Test across different devices to ensure responsiveness.</li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
h2 {
  margin-bottom: 8px;
}

h3 {
  font-size: 20px;
  font-weight: 600;
}

p {
  margin-bottom: 16px;
}
</style>
