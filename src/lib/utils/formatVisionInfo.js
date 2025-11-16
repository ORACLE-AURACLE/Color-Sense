/**
 * Formats AI response text for better readability
 * Converts markdown-style formatting to readable text with proper spacing
 */
export const formatVisionInfo = (text) => {
  if (!text) return "";

  let formatted = text;

  // Step 1: Remove markdown headers (##, ###, etc.) and convert to plain text
  formatted = formatted.replace(/^#{1,6}\s+(.+)$/gm, (match, title) => {
    return `\n\n${title.trim()}\n`;
  });

  // Step 2: Extract and format section headers (e.g., "**1. Title**")
  formatted = formatted.replace(/\*\*(\d+)\.\s*([^*]+)\*\*/g, (match, num, title) => {
    return `\n\n${title.trim()}\n`;
  });

  // Step 3: Remove remaining bold markers
  formatted = formatted.replace(/\*\*([^*]+)\*\*/g, "$1");

  // Step 4: Format bullet lists - convert * to • with proper indentation
  // Handle top-level bullets
  formatted = formatted.replace(/^\s*\*\s+/gm, "• ");
  formatted = formatted.replace(/\n\s*\*\s+/g, "\n• ");

  // Step 5: Format nested lists (indicated by +)
  formatted = formatted.replace(/^\s*\+\s+/gm, "  • ");
  formatted = formatted.replace(/\n\s*\+\s+/g, "\n  • ");

  // Step 6: Add spacing before lists
  formatted = formatted.replace(/([^\n])\n•/g, "$1\n\n•");
  formatted = formatted.replace(/([^\n])\n  •/g, "$1\n\n  •");

  // Step 7: Clean up multiple spaces (but preserve intentional spacing)
  formatted = formatted.replace(/[ \t]{2,}/g, " ");

  // Step 8: Ensure proper spacing between paragraphs
  // Add spacing after sentences that end paragraphs
  formatted = formatted.replace(/([.!?])\s*([A-Z][a-z])/g, "$1\n\n$2");

  // Step 9: Clean up excessive newlines (keep max 2 consecutive)
  formatted = formatted.replace(/\n{3,}/g, "\n\n");

  // Step 10: Remove trailing whitespace from lines
  formatted = formatted.replace(/[ \t]+$/gm, "");

  // Step 11: Ensure proper spacing around section headers
  formatted = formatted.replace(/\n\n([^\n]+)\n([A-Z])/g, "\n\n$1\n\n$2");

  return formatted.trim();
};

