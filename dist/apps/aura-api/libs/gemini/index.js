"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAIResponse = generateAIResponse;
const generative_ai_1 = require("@google/generative-ai");
async function generateAIResponse(apiKey, systemPrompt, userMessage, history) {
    try {
        const genAI = new generative_ai_1.GoogleGenerativeAI(apiKey);
        const modelsToTry = ["gemini-2.5-flash", "gemini-2.5-pro", "gemini-1.5-flash", "gemini-pro"];
        let validHistory = history.slice(-10);
        while (validHistory.length > 0 && validHistory[0].role !== 'user') {
            validHistory.shift();
        }
        const formattedHistory = validHistory.map(h => ({
            role: h.role === 'user' ? 'user' : 'model',
            parts: [{ text: h.parts }]
        }));
        for (const modelName of modelsToTry) {
            try {
                const model = genAI.getGenerativeModel({
                    model: modelName,
                    systemInstruction: systemPrompt
                });
                const chat = model.startChat({
                    history: formattedHistory,
                    generationConfig: {
                        maxOutputTokens: 1000,
                        temperature: 0.7,
                    },
                });
                const result = await chat.sendMessage(userMessage);
                const response = result.response;
                const metadata = response.usageMetadata;
                if (metadata) {
                    console.log(`[${modelName}] Usage - Prompt: ${metadata.promptTokenCount}, Output: ${metadata.candidatesTokenCount}, Total: ${metadata.totalTokenCount}`);
                }
                return response.text();
            }
            catch (e) {
                console.warn(`Model ${modelName} failed: ${e.message}`);
            }
        }
        throw new Error("All models failed.");
    }
    catch (error) {
        console.error("Gemini AI Automation Error:", error.message);
        return "I'm having trouble thinking right now. Please try again later.";
    }
}
//# sourceMappingURL=index.js.map