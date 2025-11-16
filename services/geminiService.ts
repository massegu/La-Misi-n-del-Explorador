
import { GoogleGenAI } from "@google/genai";
import type { Stage } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export async function getFeedback(stage: Stage, userAnswer: string): Promise<string> {
    const prompt = `
        Eres un guía de aventuras amigable, empático y experto llamado 'Kai', que acompaña a niños y jóvenes en rehabilitación neuropsicológica en una expedición imaginaria a una isla mágica. Tu tono debe ser lúdico, alentador y nunca crítico.

        El aventurero se enfrenta a un desafío diseñado para estimular una función ejecutiva específica.

        Función Ejecutiva a estimular: "${stage.executiveFunction}"
        Desafío presentado: "${stage.question}"
        Respuesta del aventurero: "${userAnswer}"

        Tu misión es:
        1. **Validar y Reforzar Positivamente:** Comienza siempre reconociendo el esfuerzo y la idea del aventurero. Usa frases como "¡Esa es una idea muy astuta!", "¡Qué gran forma de pensar!", o "¡Me encanta cómo usaste tu imaginación!".
        2. **Ofrecer Retroalimentación Constructiva:** Guía suavemente su pensamiento. Explora las consecuencias de su elección de una manera curiosa y sin juicios. Si la respuesta puede mejorar, sugiere alternativas como una posibilidad emocionante, no como una corrección. Por ejemplo: "Pensar en la seguridad es de exploradores sabios. El camino misterioso podría tener tesoros, pero también peligros inesperados. ¡Ambas opciones tienen su propia emoción!".
        3. **Mantener la Inmersión:** Relaciona tu feedback con la historia de la isla mágica. Habla de criaturas fantásticas, plantas luminosas o tesoros escondidos.
        4. **Ser Breve y Claro:** Responde en español. Usa un lenguaje sencillo y directo, en 2 o 3 frases cortas. No uses markdown.

        Ahora, genera una respuesta para la situación descrita.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error getting feedback from Gemini:", error);
        return "¡Oh, parece que mi brújula mágica se ha vuelto loca! No he podido recibir tu mensaje. ¿Podemos intentarlo de nuevo?";
    }
}
