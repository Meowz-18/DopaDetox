export const GeminiService = {
    analyzeTask: async (taskDescription: string, apiKey: string) => {
        const prompt = `Analyze this activity for a dopamine detox program: "${taskDescription}". 
    Estimate its dopamine impact (Low/Medium/High) and a fair XP reward (50-500) based on difficulty/benefit. 
    Return ONLY valid JSON: { "dopamine_level": "Low"|"Medium"|"High", "xp_reward": number, "reason": "short explanation" }`;

        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }]
                })
            });

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error.message);
            }

            const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
            if (!text) throw new Error("No analysis generated");

            // Extract JSON from potential markdown code blocks
            const jsonMatch = text.match(/\{[\s\S]*\}/);
            const jsonStr = jsonMatch ? jsonMatch[0] : text;

            return JSON.parse(jsonStr);
        } catch (error) {
            console.error("Gemini API Error:", error);
            throw error;
        }
    }
};
