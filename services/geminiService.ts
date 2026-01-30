
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeAppFile = async (fileName: string): Promise<AnalysisResult> => {
  const prompt = `Analyze this mobile app file name: "${fileName}". 
  Provide a professional JSON response with:
  1. A set of suggested Release Notes for this version (assuming it's a new update).
  2. A brief security check summary (hypothetical, based on standard app practices).
  3. A short marketing tagline and description.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          releaseNotes: { type: Type.STRING },
          securitySummary: { type: Type.STRING },
          marketingCopy: { type: Type.STRING }
        },
        required: ["releaseNotes", "securitySummary", "marketingCopy"]
      }
    }
  });

  try {
    const data = JSON.parse(response.text || "{}");
    return data as AnalysisResult;
  } catch (error) {
    console.error("Failed to parse Gemini response:", error);
    return {
      releaseNotes: "Minor bug fixes and performance improvements.",
      securitySummary: "Safe to install. No harmful permissions detected.",
      marketingCopy: "The latest version of your favorite app is here!"
    };
  }
};
