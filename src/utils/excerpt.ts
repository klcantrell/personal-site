/**
 * Create a clean excerpt from markdown content
 */
export function createExcerpt(content: string, maxLength: number = 150): string {
  const cleanText = content
    // Remove markdown links but keep the link text: [text](url) -> text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Remove <a> tags but keep the inner text
    .replace(/<a\b[^>]*>(.*?)<\/a>/gi, '$1')
    // Remove other markdown formatting
    .replace(/[#*`_~]/g, '')
    // Remove square brackets that might be left over
    .replace(/[\[\]]/g, '')
    // Remove code blocks
    .replace(/```[\s\S]*?```/g, '')
    // Remove inline code
    .replace(/`[^`]+`/g, '')
    // Replace multiple newlines/spaces with single space
    .replace(/\s+/g, ' ')
    // Trim whitespace
    .trim();

  if (cleanText.length <= maxLength) {
    return cleanText;
  }
  
  // Find the last complete word within the limit
  const truncated = cleanText.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');
  
  if (lastSpaceIndex > 0) {
    return truncated.substring(0, lastSpaceIndex) + '...';
  }
  
  return truncated + '...';
}