
import React from 'react';

export interface SuggestedQuestionProps {
  text: string;
  category: string;
}

interface SuggestedQuestionsProps {
  questions: SuggestedQuestionProps[];
  onSelectQuestion: (question: string) => void;
  limit?: number;
}

export const SuggestedQuestions: React.FC<SuggestedQuestionsProps> = ({ 
  questions, 
  onSelectQuestion, 
  limit = 3 
}) => {
  return (
    <div className="mb-4">
      <h4 className="text-sm font-medium mb-2">أسئلة مقترحة:</h4>
      <div className="flex flex-wrap gap-2">
        {questions.slice(0, limit).map((question, index) => (
          <button
            key={index}
            onClick={() => onSelectQuestion(question.text)}
            className="px-3 py-1.5 rounded-full text-xs bg-kidmam-purple/10 text-kidmam-purple hover:bg-kidmam-purple/20 transition-colors"
          >
            {question.text}
          </button>
        ))}
      </div>
    </div>
  );
};
