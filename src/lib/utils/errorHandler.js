/**
 * Error handling utilities for API calls and edge cases
 */

export class APIError extends Error {
  constructor(message, statusCode, type = "API_ERROR") {
    super(message);
    this.name = "APIError";
    this.statusCode = statusCode;
    this.type = type;
  }
}

/**
 * Parse error message from API response
 */
export const parseAPIError = (error) => {
  if (error instanceof APIError) {
    return {
      message: error.message,
      statusCode: error.statusCode,
      type: error.type,
    };
  }

  if (error instanceof Error) {
    // Check for common error patterns
    if (error.message.includes("Failed to fetch") || error.message.includes("NetworkError")) {
      return {
        message: "Network error. Please check your internet connection.",
        type: "NETWORK_ERROR",
      };
    }

    if (error.message.includes("rate limit") || error.message.includes("429")) {
      return {
        message: "Rate limit exceeded. Please try again in a moment.",
        type: "RATE_LIMIT",
      };
    }

    if (error.message.includes("401") || error.message.includes("Unauthorized")) {
      return {
        message: "API authentication failed. Please check your API credentials.",
        type: "AUTH_ERROR",
      };
    }

    if (error.message.includes("404")) {
      return {
        message: "API endpoint not found. Please check your API URL configuration.",
        type: "NOT_FOUND",
      };
    }

    return {
      message: error.message || "An unexpected error occurred.",
      type: "UNKNOWN_ERROR",
    };
  }

  return {
    message: "An unexpected error occurred.",
    type: "UNKNOWN_ERROR",
  };
};

/**
 * Check if API credentials are configured
 */
export const checkAPICredentials = () => {
  const API_URL = process.env.NEXT_PUBLIC_GROQ_API_URL;
  const API_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY;

  if (!API_URL || !API_KEY) {
    return {
      configured: false,
      message: "API credentials not configured. Please set NEXT_PUBLIC_GROQ_API_URL and NEXT_PUBLIC_GROQ_API_KEY environment variables.",
    };
  }

  return { configured: true };
};

/**
 * Validate hex color format
 */
export const validateHexColor = (color) => {
  if (!color) return { valid: false, message: "Color is required." };
  
  const hexPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  if (!hexPattern.test(color)) {
    return { valid: false, message: "Invalid color format. Please use hex format (e.g., #000000)." };
  }

  return { valid: true };
};

/**
 * Handle API response with error checking
 */
export const handleAPIResponse = async (response) => {
  if (!response.ok) {
    let errorMessage = `API request failed with status ${response.status}`;
    let errorType = "API_ERROR";

    try {
      const errorData = await response.json();
      errorMessage = errorData.error?.message || errorData.message || errorMessage;
      
      // Handle specific error types
      if (response.status === 429) {
        errorType = "RATE_LIMIT";
        errorMessage = "Rate limit exceeded. Please try again in a moment.";
      } else if (response.status === 401) {
        errorType = "AUTH_ERROR";
        errorMessage = "API authentication failed. Please check your API credentials.";
      } else if (response.status === 404) {
        errorType = "NOT_FOUND";
        errorMessage = "API endpoint not found. Please check your API URL configuration.";
      }
    } catch (e) {
      // If JSON parsing fails, use default message
    }

    throw new APIError(errorMessage, response.status, errorType);
  }

  return response;
};

/**
 * Create a timeout promise
 */
export const createTimeout = (ms) => {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new APIError("Request timeout. Please try again.", 408, "TIMEOUT")), ms);
  });
};

/**
 * Fetch with timeout
 */
export const fetchWithTimeout = async (url, options, timeoutMs = 30000) => {
  return Promise.race([
    fetch(url, options),
    createTimeout(timeoutMs),
  ]);
};

