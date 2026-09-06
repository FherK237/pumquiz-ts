export function calculatePoints(responseTime: number, isCorrect: boolean): number {
  if (!isCorrect) return 0;
  if (responseTime <= 2) return 100;
  if (responseTime <= 4) return 75;
  if (responseTime <= 6) return 50;
  return 0; // 7 seconds or timed out
}

export function calculateTotalScore(answers: Array<{ responseTime: number; isCorrect: boolean }>): number {
  return answers.reduce((total, answer) => total + calculatePoints(answer.responseTime, answer.isCorrect), 0);
}
