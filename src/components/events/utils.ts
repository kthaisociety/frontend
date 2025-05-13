/**
 * Formats a date string into a human-readable format
 * @param dateString - The date string to format (e.g. "2024-03-15")
 * @returns A formatted date string (e.g. "March 15, 2024")
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
} 