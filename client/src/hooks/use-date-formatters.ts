import { useCallback } from "react";

export const useDateFormatters = () => {
  const formatTime = useCallback((date: Date) => {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }, []);

  const formatFullDate = useCallback((date: Date) => {
    return date.toLocaleDateString("ru-RU", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  }, []);

  return { formatTime, formatFullDate };
};
