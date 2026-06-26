export function calculateWpm(
  correctChars: number,
  elapsedSeconds: number
): number {
  if (elapsedSeconds === 0) return 0;
  // Standard: 5 chars = 1 word
  const words = correctChars / 5;
  const minutes = elapsedSeconds / 60;
  return Math.round(words / minutes);
}

export function calculateAccuracy(
  totalChars: number,
  mistakes: number
): number {
  if (totalChars === 0) return 100;
  const correct = totalChars - mistakes;
  return Math.round((correct / totalChars) * 100);
}
