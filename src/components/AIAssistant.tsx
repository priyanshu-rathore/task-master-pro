import React, { useState } from 'react';
import { useAI } from '../context/AIContext ';

interface AIAssistantProps {
  projectId: string;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ projectId }) => {
  const { summary, answer, isLoading, fetchSummary, askQuestion } = useAI();
  const [userQuestion, setUserQuestion] = useState('');

  const handleAskQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuestion.trim()) return;
    askQuestion(projectId, userQuestion);
    setUserQuestion('');
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h3 className="text-lg font-bold mb-3">Gemini AI Assistant</h3>
      
      <div className="space-y-4">
        <button
          onClick={() => fetchSummary(projectId)}
          disabled={isLoading}
          className="w-full p-2 bg-blue-600 rounded disabled:bg-gray-500"
        >
          {isLoading ? 'Generating...' : 'Generate Project Summary'}
        </button>

        <form onSubmit={handleAskQuestion} className="flex gap-2">
          <input
            type="text"
            value={userQuestion}
            onChange={(e) => setUserQuestion(e.target.value)}
            placeholder="Ask a question..."
            className="flex-grow p-2 bg-gray-700 rounded"
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading} className="p-2 bg-green-600 rounded disabled:bg-gray-500">
            Ask
          </button>
        </form>
        
        {isLoading && <p>AI is thinking...</p>}

        {summary && !isLoading && (
          <div className="mt-4">
            <h4 className="font-semibold">Summary:</h4>
            <p className="text-sm whitespace-pre-wrap">{summary}</p>
          </div>
        )}

        {answer && !isLoading && (
          <div className="mt-4">
            <h4 className="font-semibold">Answer:</h4>
            <p className="text-sm whitespace-pre-wrap">{answer}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAssistant;
