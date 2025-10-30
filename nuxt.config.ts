// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },
  ssr: false,
  css: ["~/assets/css/main.css"],
  app: {
    head: {
      script: [{ src: "https://accounts.google.com/gsi/client" }],
      link: [
        {
          rel: "shortcut icon",
          href: "/logo.svg",
        },
        {
          rel: "icon",
          href: "/logo.svg",
        },
        {
          rel: "apple-touch-icon",
          href: "/logo.svg",
        },
        {
          rel: "apple-touch-startup-image",
          href: "/logo.svg",
        },
      ],
      title: "Welcome to Pixelle",
      meta: [
        {
          name: "theme-color",
          content: "#030712",
        },
        {
          name: "apple-mobile-web-app-capable",
          content: "yes",
        },
        {
          name: "mobile-web-app-capable",
          content: "yes",
        },
        {
          name: "description",
          content:
            "Pixelle is a powerful, intuitive component library designed to streamline your development process and deliver stunning, responsive UIs. Empower your team to create without limits.",
        },
        {
          name: "keywords",
          content:
            "UI,library,component,html,css,javascript,framework,card,button,elements,react,next,nuxt,vue,tailwind",
        },
        {
          name: "author",
          content: "Urooj Khan, Belal Naim",
        },
      ],
    },
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/icon",
    "nuxt-vue3-google-signin",
    "@nuxt/content",
    "@vueuse/nuxt",
  ],
  googleSignIn: {
    clientId:
      "276628044331-2288qcmck1jskicaun6gfm8pk5nh3q1m.apps.googleusercontent.com",
  },
  tailwindcss: {
    exposeConfig: true,
  },
  content: {
    build: {
      markdown: {
        highlight: {
          theme: {
            default: "github-dark",
            dark: "github-dark",
          },
        },
        toc: {
          depth: 3,
        },
      },
    },
  },
});