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
