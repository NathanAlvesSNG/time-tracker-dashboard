import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getProductivityUI(productivity: number) {
  if (productivity >= 80) {
    return {
      emoji: "😀",
      border: "border-green-500",
      text: "Excelente",
    };
  }

  if (productivity >= 50) {
    return {
      emoji: "😐",
      border: "border-yellow-500",
      text: "Mediano",
    };
  }

  return {
    emoji: "☹️",
    border: "border-red-500",
    text: "Ruim",
  };
}

export function formatHoursToHMS(hours: number) {
  const totalSeconds = Math.floor(hours * 3600);

  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;

  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s
    .toString()
    .padStart(2, "0")}`;
}

export function formatSecondsToHMS(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s
    .toString()
    .padStart(2, "0")}`;
}

export function formatHoursToHHMM(hours: number) {
  const totalMinutes = Math.round(hours * 60);
  const hh = Math.floor(totalMinutes / 60);
  const mm = totalMinutes % 60;

  return `${hh.toString().padStart(2, "0")}:${mm.toString().padStart(2, "0")}`;
}
