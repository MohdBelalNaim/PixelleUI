<script setup lang="ts">
import { useTitle } from "~/composable/useTitle";
import { API_URL, FILE_URL } from "~/composable/useURLs";
import { useProjects } from "~/store/projects.store";
import VCodeBlock from "@wdns/vue-code-block";
import type { IProject } from "~/store/projects.interface";
import { useUser } from "~/composable/useUser";
import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

definePageMeta({
  layout: "custom",
});

const projects = useProjects();
const user = useUser();

const route = useRoute();
const { name } = route.params;

const title = useTitle();
const selectedTab = ref<string>("index.html");
const code = ref("");
const htmlCode = ref("");
const cssCode = ref("");
const jsCode = ref("");
const isDownloading = ref(false);

const getProject = ref<IProject>();

// Get runtime config for AWS credentials
const config = useRuntimeConfig();

// Initialize Bedrock client with explicit credentials
const bedrockClient = new BedrockRuntimeClient({
  region: config.public.awsRegion,
  credentials: {
    accessKeyId: config.public.awsAccessKeyId,
    secretAccessKey: config.public.awsSecretAccessKey,
  },
});

watch(
  [projects, route.params],
  () => {
    if (projects.value) {
      let project = projects?.value.find((p) => p?.id == name);
      title.value = project?.name;
      getProject.value = project;
    }
  },
  { deep: true, immediate: true }
);

function loadText() {
  fetch(`${FILE_URL}${name}/${selectedTab.value}`, {
    cache: "no-store",
  })
    .then((d) => {
      if (!d.ok) {
        throw new Error(`Failed to load ${selectedTab.value}`);
      }
      return d.text();
    })
    .then((d) => {
      code.value = d;
      
      // Store HTML, CSS, and JS separately for Bedrock API
      if (selectedTab.value.endsWith('html')) {
        htmlCode.value = d;
      } else if (selectedTab.value.endsWith('css')) {
        cssCode.value = d;
      } else if (selectedTab.value.endsWith('js')) {
        jsCode.value = d;
      }
    })
    .catch((error) => {
      console.error(`Error loading ${selectedTab.value}:`, error);
      code.value = `// Error loading file: ${selectedTab.value}\n// ${error.message}`;
    });
}

async function callBedrock() {
  try {
    if (!htmlCode.value) {
      console.log('HTML is required to generate React component');
      throw new Error('HTML code is required');
    }

    // Build file list description
    const filesPresent = [];
    if (cssCode.value) filesPresent.push('CSS');
    if (jsCode.value) filesPresent.push('JavaScript');
    const filesDescription = filesPresent.length > 0 ? `, ${filesPresent.join(', and ')}` : '';

    // Build prompt based on available files
    let prompt = `Convert the following HTML${filesDescription} into a standalone React component.

Requirements:
- Return ONLY the React component code.
- Do NOT add explanations.
- Do NOT use markdown fences.
- Use a functional React component named GeneratedComponent.
${cssCode.value ? '- Merge all CSS into the component using inline styles or styled-components.' : '- Create appropriate inline styles for the component.'}
${jsCode.value ? '- Convert the JavaScript logic into React hooks (useState, useEffect, etc.) and event handlers.' : '- Add any necessary interactivity using React patterns.'}

HTML:
${htmlCode.value}`;

    if (cssCode.value) {
      prompt += `\n\nCSS:\n${cssCode.value}`;
    }

    if (jsCode.value) {
      prompt += `\n\nJavaScript:\n${jsCode.value}`;
    }

    // Prepare the request payload for Claude
    const payload = {
      anthropic_version: "bedrock-2023-05-31",
      max_tokens: 2000,
      temperature: 0.7,
      messages: [
        {
          role: "user",
          content: prompt
        }
      ]
    };

    // Create the command
    const command = new InvokeModelCommand({
      modelId: 'us.anthropic.claude-3-5-sonnet-20241022-v2:0',
      contentType: 'application/json',
      accept: 'application/json',
      body: JSON.stringify(payload)
    });

    // Invoke the model
    const response = await bedrockClient.send(command);
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));
    
    const text = responseBody.content[0].text;
    console.log("React Component Output:\n", text);
    
    return text;
  } catch (error: any) {
    console.error('Bedrock API Error:', error?.message || error);
    throw error;
  }
}

function getIcon(tab: string) {
  if (tab.endsWith("html")) return "html";
  else if (tab.endsWith("css")) return "css";
  else return "javascript";
}

function downloadFile(content: string, filename: string, contentType: string) {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

async function handleDownloadReact() {
  if (isDownloading.value) return; // Prevent multiple clicks
  
  try {
    isDownloading.value = true;
    
    // Always fetch HTML if not loaded (required)
    if (!htmlCode.value) {
      const htmlResponse = await fetch(`${FILE_URL}${name}/index.html`, {
        cache: "no-store",
      });
      if (!htmlResponse.ok) {
        throw new Error('Failed to fetch HTML file');
      }
      htmlCode.value = await htmlResponse.text();
    }
    
    // Try to fetch CSS if not already loaded (optional)
    if (!cssCode.value) {
      try {
        const cssResponse = await fetch(`${FILE_URL}${name}/style.css`, {
          cache: "no-store",
        });
        if (cssResponse.ok) {
          cssCode.value = await cssResponse.text();
          console.log('✅ CSS file loaded');
        } else {
          console.log('ℹ️ No CSS file found');
        }
      } catch (cssError) {
        console.log('ℹ️ CSS file not available');
      }
    }
    
    // Try to fetch JS if not already loaded (optional)
    if (!jsCode.value) {
      try {
        const jsResponse = await fetch(`${FILE_URL}${name}/script.js`, {
          cache: "no-store",
        });
        if (jsResponse.ok) {
          jsCode.value = await jsResponse.text();
          console.log('✅ JavaScript file loaded');
        } else {
          console.log('ℹ️ No JavaScript file found');
        }
      } catch (jsError) {
        console.log('ℹ️ JavaScript file not available');
      }
    }
    
    // Call Bedrock API to get React component
    const reactComponent = await callBedrock();
    
    if (reactComponent) {
      // Download the React component as a .jsx file
      const componentName = getProject.value?.name?.replace(/\s+/g, '') || 'GeneratedComponent';
      downloadFile(reactComponent, `${componentName}.jsx`, 'text/javascript');
      
      // Log what files were used
      const filesUsed = ['HTML'];
      if (cssCode.value) filesUsed.push('CSS');
      if (jsCode.value) filesUsed.push('JavaScript');
      console.log(`✅ React component generated from: ${filesUsed.join(', ')}`);
      console.log('✅ Download successful!');
    }
  } catch (error: any) {
    console.error('Error downloading React component:', error?.message || error);
    alert(`Failed to download React component: ${error?.message || 'Unknown error'}`);
  } finally {
    isDownloading.value = false;
  }
}

watch(selectedTab, loadText);

onMounted(() => {
  loadText();
});
</script>
<template>
  <div class="wrapper">
    <section class="tab-container code-container">
      <header>
        <button v-if="getProject" v-for="tab in getProject?.files.split(',')" @click="selectedTab = tab"
          :class="{ active: selectedTab === tab }">
          <img :src="`/icons/${getIcon(tab)}.svg`" :alt="tab + 'logo'" width="16" />
          {{ tab }}
        </button>
      </header>
      <div class="relative">
        <VCodeBlock code-block-radius="0" :code="code" :lang="getIcon(selectedTab)" highlightjs
          :css-path="import('~/assets/css/shades-of-purple.css')" theme="false" />
        <CopyButton :text="code" />
      </div>
    </section>

    <!-- output panel -->
    <section class="tab-container output">
      <header class="h-9 px-1">
        <NuxtLink v-if="user?.id == getProject?.userid" :to="`/create/${getProject?.id}`" class="icon-btn mr-8">
          <img src="/icons/desktop.svg" class="w-5 invert" />
          <span>Edit</span>
        </NuxtLink>
        <button 
          @click="handleDownloadReact" 
          :disabled="isDownloading"
          class="border text-xs px-4 py-1 rounded-full cursor-pointer flex items-center gap-2 bg-white text-black hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed">
          <svg v-if="isDownloading" class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <img v-else src="https://cdn-icons-png.flaticon.com/512/16921/16921758.png" class="w-5" alt="react icon" />
          <span>{{ isDownloading ? 'Generating...' : 'Download React component' }}</span>
        </button>
        <NuxtLink :to="'/user/' + getProject?.userid" class="user">
          <img :src="getProject?.picture" alt="user avater" />
          <span>{{ getProject?.user }}</span>
        </NuxtLink>
      </header>
      <iframe id="frame" :src="`${FILE_URL}${name}/index.html`" frameborder="0"
        class="border-l border-slate-800 max-sm:aspect-square" allow="camera"></iframe>
    </section>
  </div>
</template>

<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  min-height: 100%;
  overflow: hidden;
  background-color: #0f172a;

  iframe {
    width: 100%;
    height: 100%;
    align-self: end;
    background-color: var(--background);
  }
}

header button {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 16px;
  transition: 0.3s ease;
}

@media screen and (width<600px) {
  .wrapper {
    grid-template-columns: 1fr;
  }

  .output {
    grid-row-start: 1;
  }
}

.icon-btn {
  display: flex;
  align-items: center;
  gap: 4px;
}

.tab-container {
  display: grid;
  grid-template-rows: max-content auto;

  header {
    display: flex;
    align-items: center;

    .active {
      background-color: var(--background);
      color: aliceblue;
    }

    .user {
      margin-block: 3px;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      border-radius: 16px;
      white-space: nowrap;
      padding: 4px 8px 4px 6px;
      margin-left: auto;
      background: linear-gradient(90deg, var(--primary), var(--secondary));
      cursor: pointer;
    }

    img {
      width: 20px;
      height: 20px;
      border-radius: 50%;
    }
  }

  .code_container {
    width: 100%;
    height: 100%;
    outline: none;
    padding: 16px;
    font-size: 16px;
    font-family: consolas, monospace;
    resize: none;
    text-wrap-style: pretty;
    background-color: transparent;
    background-color: var(--background);
  }
}
</style>
