import { GoogleGenAI } from "@google/genai";

// Ensure the API key is present
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("API_KEY is missing from the environment variables.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const MODEL_NAME = 'gemini-2.5-flash-image';

/**
 * Generates a styled portrait based on an input image and a prompt.
 * 
 * @param imageBase64 The base64 string of the uploaded image (without data:image/xxx;base64 prefix is preferred by some libs, but SDK handles inlineData well)
 * @param mimeType The mime type of the image
 * @param prompt The specific style prompt
 * @returns The base64 string of the generated image or null if failed
 */
export const generateStyledPortrait = async (
  imageBase64: string,
  mimeType: string,
  prompt: string
): Promise<string | null> => {
  try {
    // Clean base64 if it includes the header
    const cleanBase64 = imageBase64.split(',')[1] || imageBase64;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: cleanBase64
            }
          },
          {
            text: prompt
          }
        ]
      },
      config: {
        imageConfig: {
          aspectRatio: "3:4", // Professional portrait aspect ratio
        }
      }
    });

    // Extract image from response
    // The response structure for image generation usually involves iterating parts
    // looking for inlineData.
    if (response.candidates && response.candidates[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData && part.inlineData.data) {
                return part.inlineData.data;
            }
        }
    }

    console.warn("No image data found in response");
    return null;

  } catch (error) {
    console.error("Error generating portrait:", error);
    return null;
  }
};
