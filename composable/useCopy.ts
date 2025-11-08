export async function copyCode(text: string) {
  let copied = false;
  try {
    await navigator.clipboard.writeText(text);
    copied = true;
  } catch (e) {
    console.log(e);
  } finally {
    return copied;
  }
}
