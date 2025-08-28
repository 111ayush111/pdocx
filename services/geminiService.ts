/// <reference types="vite/client" />
import { GoogleGenerativeAI } from "@google/generative-ai";

// Add this declaration to extend ImportMeta type for Vite env
interface ImportMetaEnv {
  readonly VITE_GEMINI_API_KEY: string;
  // add other env variables here if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Use env key instead of hardcoding
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(",")[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
};

export const extractTextFromImage = async (file: File): Promise<string> => {
  if (!API_KEY) {
    throw new Error(
      "API Key is missing. Please add VITE_GEMINI_API_KEY in your .env.local"
    );
  }

  const ai = new GoogleGenerativeAI(API_KEY);
  const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" }); // correct way

  try {
    const imagePart = await fileToGenerativePart(file);
    const prompt =
      "Extract all text from this image. Preserve line breaks. If there is no text, return an empty string.";

    const response = await model.generateContent([prompt, imagePart]);
    console.log("API Response:", response);

    return response.response.text().trim(); // correct parsing
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to communicate with Gemini API.");
  }
};
