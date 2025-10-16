/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext } from "react";
import * as api from "../services/api";
import toast from "react-hot-toast";

interface AIContextType {
  summary: string;
  answer: string;
  isLoading: boolean;
  fetchSummary: (projectId: string) => Promise<void>;
  askQuestion: (projectId: string, question: string) => Promise<void>;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

export const AIProvider = ({ children }: { children: React.ReactNode }) => {
  const [summary, setSummary] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchSummary = async (projectId: string) => {
    setIsLoading(true);
    setAnswer(""); // Clear previous answers
    try {
      const response = await api.getProjectSummary(projectId);
      setSummary(response.data.summary);
      toast.success("AI summary generated!");
    } catch (error) {
      toast.error("Failed to get summary from AI.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const askQuestion = async (projectId: string, question: string) => {
    setIsLoading(true);
    setSummary(""); // Clear previous summaries
    try {
      const response = await api.askProjectQuestion(projectId, question);
      setAnswer(response.data.answer);
    } catch (error) {
      toast.error("Failed to get answer from AI.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AIContext.Provider
      value={{ summary, answer, isLoading, fetchSummary, askQuestion }}
    >
      {children}
    </AIContext.Provider>
  );
};

export const useAI = (): AIContextType => {
  const context = useContext(AIContext);
  if (!context) {
    throw new Error("useAI must be used within an AIProvider");
  }
  return context;
};
