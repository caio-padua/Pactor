import { useState, useEffect } from "react";
import type { AnswerMap } from "../data/questionnaire";

const DRAFT_KEY = "padcom:draft";

export function useDraft() {
  const [answers, setAnswers] = useState<AnswerMap>(() => {
    try {
      const stored = localStorage.getItem(DRAFT_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(answers));
  }, [answers]);

  const updateAnswer = (code: string, value: string | undefined) => {
    setAnswers((prev) => ({
      ...prev,
      [code]: value,
    }));
  };

  const clearDraft = () => {
    setAnswers({});
    localStorage.removeItem(DRAFT_KEY);
  };

  return { answers, updateAnswer, clearDraft };
}
