// Configuración de OpenAI
const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';
const OPENAI_MODEL = 'gpt-4';
// Abrir la interfaz del plugin
penpot.ui.openUI("AI Plugin", "", {
    width: 285,
    height: 540
});
// Configurar el listener para mensajes de Penpot
penpot.ui.on("message", async (message) => {
    switch (message.type) {
        case 'init':
            const foundations = localStorage.getItem('foundations');
            const apiKey = localStorage.getItem('openai_api_key');
            if (!foundations) {
                penpot.ui.postMessage({ type: 'requestFoundations' });
            }
            else if (!apiKey) {
                penpot.ui.postMessage({ type: 'requestApiKey' });
            }
            else {
                penpot.ui.postMessage({ type: 'ready' });
            }
            break;
        case 'saveFoundations':
            try {
                const foundations = JSON.parse(message.data);
                localStorage.setItem('foundations', JSON.stringify(foundations));
                penpot.ui.postMessage({ type: 'foundationsSaved' });
            }
            catch (_a) {
                penpot.ui.postMessage({ type: 'foundationsError' });
            }
            break;
        case 'saveApiKey':
            localStorage.setItem('openai_api_key', message.data);
            penpot.ui.postMessage({ type: 'apiKeySaved' });
            break;
        case 'generateUI':
            const foundationsData = localStorage.getItem('foundations');
            const apiKeyData = localStorage.getItem('openai_api_key');
            if (!foundationsData || !apiKeyData) {
                penpot.ui.postMessage({ type: 'missingData' });
                break;
            }
            try {
                const response = await generateUI({
                    apiKey: apiKeyData,
                    text: message.data.text,
                    foundations: JSON.parse(foundationsData)
                });
                penpot.ui.postMessage({
                    type: 'uiGenerated',
                    data: response
                });
            }
            catch (_b) {
                penpot.ui.postMessage({ type: 'generationError' });
            }
            break;
    }
});
// Función para generar UI
async function generateUI(params) {
    var _a, _b, _c;
    const systemMessage = `Eres un asistente que genera un array JSON de nodos UI usando estos foundations:\n${JSON.stringify(params.foundations)}`;
    const response = await fetch(OPENAI_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${params.apiKey}`
        },
        body: JSON.stringify({
            model: OPENAI_MODEL,
            messages: [
                { role: 'system', content: systemMessage },
                { role: 'user', content: params.text }
            ],
            temperature: 0.7
        })
    });
    const data = await response.json();
    const content = (_c = (_b = (_a = data.choices) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.message) === null || _c === void 0 ? void 0 : _c.content;
    if (!content) {
        throw new Error();
    }
    return JSON.parse(content);
}
export {};
