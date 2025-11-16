import { APIError, checkAPICredentials, handleAPIResponse, fetchWithTimeout, validateHexColor } from "@/lib/utils/errorHandler";

const API_URL = process.env.NEXT_PUBLIC_GROQ_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY;

// Normalize API URL
const getApiUrl = () => {
  if (!API_URL) return null;
  
  if (API_URL.includes('/openai/v1')) {
    return API_URL.endsWith('/') ? API_URL.slice(0, -1) : API_URL;
  }
  
  const baseUrl = API_URL.endsWith('/') ? API_URL.slice(0, -1) : API_URL;
  return `${baseUrl}/openai/v1`;
};

export const getColorGuidance = async (foregroundColor, backgroundColor, contrastRatio, visionMode, compliance) => {
  // Validate colors
  const fgValidation = validateHexColor(foregroundColor);
  if (!fgValidation.valid) {
    throw new APIError(fgValidation.message, 0, "VALIDATION_ERROR");
  }

  const bgValidation = validateHexColor(backgroundColor);
  if (!bgValidation.valid) {
    throw new APIError(bgValidation.message, 0, "VALIDATION_ERROR");
  }

  // Check API credentials
  const credentialsCheck = checkAPICredentials();
  if (!credentialsCheck.configured) {
    throw new APIError(credentialsCheck.message, 0, "CONFIG_ERROR");
  }

  if (!API_URL || !API_KEY) {
    throw new APIError("Groq API credentials not configured.", 0, "CONFIG_ERROR");
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

  const visionModeName = visionModeMap[visionMode] || visionMode;
  const isCompliant = compliance.normal.AA || compliance.large.AA;
  const status = isCompliant 
    ? (compliance.normal.AAA ? "excellent (AAA)" : "good (AA)")
    : "poor (does not meet WCAG standards)";

  const prompt = `You are a color accessibility expert. Provide guidance on color contrast and accessibility.

Current color combination:
- Foreground (Text): ${foregroundColor}
- Background: ${backgroundColor}
- Contrast Ratio: ${contrastRatio.toFixed(2)}:1
- WCAG Status: ${status}
- Vision Mode: ${visionModeName}

Please provide:
1. An assessment of the current contrast ratio and WCAG compliance
2. How users with ${visionModeName} perceive these colors
3. Specific recommendations to improve contrast if it's poor, including:
   - Suggested color adjustments (lighter/darker shades)
   - Alternative color combinations that work well
   - Best practices for text and background color pairing
4. Guidance on associative colors that complement this combination
5. Tips for ensuring accessibility across different vision types

Format your response clearly with sections. Be specific and actionable.`;

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
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content: "You are a helpful accessibility expert specializing in color contrast, WCAG compliance, and color vision deficiencies. Provide clear, actionable advice."
            },
            {
              role: "user",
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 2000
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
    console.error("Color guidance API error:", error);
    throw new APIError(error.message || "Failed to retrieve color guidance.", 0, "UNKNOWN_ERROR");
  }
};

