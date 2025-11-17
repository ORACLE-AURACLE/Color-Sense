import { APIError, checkAPICredentials, handleAPIResponse, fetchWithTimeout } from "@/lib/utils/errorHandler";

const API_URL = process.env.NEXT_PUBLIC_GROQ_API_URL
const API_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY

// Normalize API URL - ensure it ends with /openai/v1 or construct it properly
const getApiUrl = () => {
  if (!API_URL) return null;
  
  // If URL already includes /openai/v1, use it as is
  if (API_URL.includes('/openai/v1')) {
    return API_URL.endsWith('/') ? API_URL.slice(0, -1) : API_URL;
  }
  
  // If it's just the base URL, append /openai/v1
  const baseUrl = API_URL.endsWith('/') ? API_URL.slice(0, -1) : API_URL;
  return `${baseUrl}/openai/v1`;
};

export const getVisionModeInfo = async (visionModeId) => {
  // Check API credentials
  const credentialsCheck = checkAPICredentials();
  if (!credentialsCheck.configured) {
    throw new APIError(credentialsCheck.message, 0, "CONFIG_ERROR");
  }

  if (!API_URL || !API_KEY) {
    throw new APIError("Groq API credentials not configured. Please set NEXT_PUBLIC_GROQ_API_URL and NEXT_PUBLIC_GROQ_API_KEY environment variables.", 0, "CONFIG_ERROR");
  }

  const visionModeMap = {
    normal: "Normal Vision",
    deuteranopia: "Deuteranopia",
    protanopia: "Protanopia",
    tritanopia: "Tritanopia",
    achromatopsia: "Achromatopsia",
    deuteranomaly: "Deuteranomaly",
    protanomaly: "Protanomaly",
    tritanomaly: "Tritanomaly",
    monochromacy: "Monochromacy"
  };

  const visionModeName = visionModeMap[visionModeId] || visionModeId;

  const prompt = `Explain ${visionModeName} (color vision deficiency) in detail. Include:
1. What it is and how it affects vision
2. How colors are perceived differently
3. How it is managed or treated
4. Any other relevant information about this condition

Provide a comprehensive, educational explanation that helps people understand this vision condition.`;

  try {
    const baseApiUrl = getApiUrl();
    if (!baseApiUrl) {
      throw new APIError("Invalid API URL configuration.", 0, "CONFIG_ERROR");
    }

    const response = await fetchWithTimeout(
      `${baseApiUrl}/chat/completions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            {
              role: "system",
              content: "You are a helpful assistant that provides educational information about color vision deficiencies and color blindness."
            },
            {
              role: "user",
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 3000
        })
      },
      30000 // 30 second timeout
    );

    const validResponse = await handleAPIResponse(response);
    const data = await validResponse.json();
    
    if (!data.choices || !data.choices[0]?.message?.content) {
      throw new APIError("Invalid response format from API.", 500, "INVALID_RESPONSE");
    }

    return data.choices[0].message.content;
  } catch (error) {
    // Re-throw APIError as-is, wrap others
    if (error instanceof APIError) {
      throw error;
    }
    console.error("Groq API error:", error);
    throw new APIError(error.message || "Failed to retrieve vision mode information.", 0, "UNKNOWN_ERROR");
  }
};

