export function calculatePoints(responseTime: number, isCorrect: boolean): number {
  if (!isCorrect) return 0;
  if (responseTime <= 3) return 100;
  if (responseTime <= 5) return 85;
  if (responseTime <= 7) return 75;
  if (responseTime <= 9) return 50;
  if (responseTime <= 11) return 40;
  return 0; // 15 seconds or timed out
}

export function calculateTotalScore(answers: Array<{ responseTime: number; isCorrect: boolean }>): number {
  return answers.reduce((total, answer) => total + calculatePoints(answer.responseTime, answer.isCorrect), 0);
}
