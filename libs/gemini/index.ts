import { GoogleGenerativeAI, Content } from "@google/generative-ai";

export async function generateAIResponse(
    apiKey: string,
    systemPrompt: string,
    userMessage: string,
    history: { role: 'user' | 'model', parts: string }[]
) {
    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const modelsToTry = ["gemini-2.5-flash", "gemini-2.5-pro", "gemini-1.5-flash", "gemini-pro"]; // Added 1.5/pro as extra safety fallbacks

        // Limit history to a "Sliding Window" of the last 10 turns (5 user/5 model)
        // This keeps token usage predictable.
        let validHistory = history.slice(-10);
        while (validHistory.length > 0 && validHistory[0].role !== 'user') {
            validHistory.shift();
        }

        const formattedHistory: Content[] = validHistory.map(h => ({
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

                // LOG TOKEN USAGE (Crucial for monitoring)
                const metadata = response.usageMetadata;
                if (metadata) {
                    console.log(`[${modelName}] Usage - Prompt: ${metadata.promptTokenCount}, Output: ${metadata.candidatesTokenCount}, Total: ${metadata.totalTokenCount}`);
                }

                return response.text();

            } catch (e: any) {
                console.warn(`Model ${modelName} failed: ${e.message}`);
                // Continue to next model
            }
        }
        throw new Error("All models failed.");
    } catch (error: any) {
        console.error("Gemini AI Automation Error:", error.message);
        return "I'm having trouble thinking right now. Please try again later.";
    }
}