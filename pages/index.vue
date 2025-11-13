<script setup lang="ts">
const features = [
  {
    icon: "pixelarticons:group",
    title: "Pixel-Perfect Design",
    subtitle:
      "Every component is meticulously crafted to ensure flawless visual precision across devices.",
  },

  {
    icon: "hugeicons:modern-tv",
    title: "Modern & Lightweight",
    subtitle: "Built with modern technologies for performance and efficiency.",
  },

  {
    icon: "gridicons:customize",
    title: "Customizable & Flexible",
    subtitle:
      "Adapt components to match your branding and unique requirements effortlessly.",
  },
  {
    icon: "solar:code-outline",
    title: "Built for Developers",
    subtitle:
      "Clean, well-documented code ensures easy integration and rapid development.",
  },
  {
    icon: "mdi:responsive",
    title: "Seamless Responsiveness",
    subtitle:
      "Designed with mobile-first principles to ensure your app looks great on any screen size.",
  },
];
</script>

<template>
  <div class="bg">
    <NavBar />
    <section
      class="min-h-[calc(100dvh-64px)] sm:min-h-[calc(100dvh-80px)] max-width text-center grid gap-4 place-items-center content-center"
    >
      <img src="/logo.svg" alt="logo" class="w-24 mb-4" />
      <h1
        class="max-w-2xl font-medium text-3xl sm:text-4xl leading-[1.5] capitalize"
      >
        Build Modern Interfaces <br />
        with Pixel-Perfect Precision.
      </h1>
      <p class="max-w-4xl text-lg sm:text-xl">
        Pixelle is a powerful, intuitive component library designed to
        streamline your development process and deliver stunning, responsive
        UIs. Empower your team to create without limits.
      </p>
      <NuxtLink to="/components">
        <button
          class="px-5 py-2.5 flex items-center gap-1 rounded-full mt-8 group transition-all duration-500 bg-secondary hover:bg-[#007bff]"
        >
          Explore Components
          <img
            src="/icons/arrow-right.svg"
            class="invert w-5 transform-translate duration-500 group-hover:translate-x-1"
          />
        </button>
      </NuxtLink>
    </section>
  </div>
  <div class="max-width py-16 min-h-dvh">
    <div class="text-center text-4xl font-medium mb-12 text-blue-400">
      Why Pixelle?
    </div>
    <div class="grid gap-6 max-w-max mx-auto">
      <div
        v-for="(feature, index) in features"
        :key="index"
        class="flex gap-6 items-center rounded-2xl p-8 bg-blue-950/30 hover:bg-blue-950/50 transition-colors"
      >
        <icon :name="feature.icon" size="52px" class="text-slate-400" />
        <div>
          <h3 class="text-xl font-medium text-blue-400">
            {{ feature.title }}
          </h3>
          <p class="text-slate-400">{{ feature.subtitle }}</p>
        </div>
      </div>
    </div>
  </div>
  <div class="h-dvh"></div>
</template>

<style></style>
