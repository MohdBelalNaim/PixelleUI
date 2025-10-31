<template>
  <div class="absolute inset-0" :id="'editor' + id"></div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { editor } from "monaco-editor";
import { createEditor } from "~/composable/config";
import type { Languages } from "~/types/language.type";

const props = withDefaults(
  defineProps<{
    id: number;
    text?: string;
    lang?: Languages;
  }>(),
  {
    text: "",
    lang: "html",
  }
);

let codeEditor: editor.IStandaloneCodeEditor;

const emit = defineEmits(["change", "editor"]);

let hasValue = 0;

onMounted(async () => {
  codeEditor = createEditor(
    document.getElementById("editor" + props.id) as HTMLElement,
    props.lang
  );

  codeEditor.setValue(props.text);
  emit("change", codeEditor.getValue());
  emit("editor", codeEditor);

  watch(props, () => {
    if (hasValue > 1 || useRoute().query.new) return;
    codeEditor.setValue(props.text);
    codeEditor.getAction("editor.action.formatDocument")?.run();
    hasValue++;
  });

  codeEditor.onDidChangeModelContent(() =>
    emit("change", codeEditor.getValue())
  );
});
</script>
