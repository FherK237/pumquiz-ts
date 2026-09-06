interface QuestionCardProps {
  questionNumber: number;
  totalQuestions: number;
  questionText: string;
}

export default function QuestionCard({ questionNumber, totalQuestions, questionText }: QuestionCardProps) {
  return (
    <div className="w-full">
      <p className="text-sm font-medium text-purple-400 mb-2">
        Question {questionNumber}/{totalQuestions}
      </p>
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 leading-snug break-words">
        {questionText}
      </h2>
    </div>
  );
}
