// src/plugin.ts
async function main() {
  try {
    const foundations = await penpot.storage.getItem("foundations");
    if (!foundations) {
      await penpot.ui.showToast("Por favor, configura los foundations primero");
      return;
    }
    const apiKey = await penpot.storage.getItem("openai_api_key");
    if (!apiKey) {
      await penpot.ui.showToast("Por favor, configura tu API key de OpenAI");
      return;
    }
    await penpot.ui.showToast("\u{1F389} Plugin listo");
  } catch (err) {
    console.error("Error:", err);
  }
}
main().catch(console.error);
