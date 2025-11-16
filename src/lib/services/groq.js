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
  if (!API_URL || !API_KEY) {
    throw new Error("Groq API credentials not configured. Please set NEXT_PUBLIC_GROQ_API_URL and NEXT_PUBLIC_GROQ_API_KEY environment variables.");
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
    const response = await fetch(`${baseApiUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "meta-llama/llama-4-maverick-17b-128e-instruct",
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
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || "Unable to retrieve information about this vision mode.";
  } catch (error) {
    console.error("Groq API error:", error);
    throw error;
  }
};

