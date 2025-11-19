export default defineEventHandler(async (event) => {
  const { content } = await readBody(event);
  const parsed = await parseMarkdown(content);
  return { parsed };
});
