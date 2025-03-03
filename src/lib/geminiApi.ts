
// Utility functions for interacting with Google's Gemini AI API

interface GeminiResponse {
  success: boolean;
  text: string;
  error?: string;
}

export const generateGeminiResponse = async (
  prompt: string,
  apiKey: string | null
): Promise<GeminiResponse> => {
  // If no API key is provided, return an error
  if (!apiKey) {
    return {
      success: false,
      text: "Please provide a Gemini API key to use enhanced AI features.",
      error: "No API key provided"
    };
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are MindfulAI, a mental wellness companion. Always respond in a helpful, supportive and educational way about mental health topics. 
                  
                  If a user is sharing emotions, suggest coping strategies and empathize with them. If they're asking about mental health topics, provide accurate, science-based information.
                  
                  User input: ${prompt}`
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            topP: 0.9,
            topK: 40,
            maxOutputTokens: 1024,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        text: "I encountered an error connecting to my AI services. Please try again later or check your API key.",
        error: errorData.error?.message || "Error connecting to Gemini API"
      };
    }

    const data = await response.json();
    
    // Extract the text from the response
    if (data.candidates && data.candidates[0]?.content?.parts?.length > 0) {
      return {
        success: true,
        text: data.candidates[0].content.parts[0].text || "I'm not sure how to respond to that."
      };
    } else {
      return {
        success: false,
        text: "I received an unexpected response format from my AI services. Please try again.",
        error: "Unexpected response format"
      };
    }
  } catch (error) {
    console.error("Error in Gemini API call:", error);
    return {
      success: false,
      text: "I encountered an error connecting to my AI services. Please try again later.",
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
};
