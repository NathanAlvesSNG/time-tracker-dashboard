import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getProductivityUI(productivity: number) {
  if (productivity >= 80) {
    return {
      emoji: "😄",
      border: "border-green-500",
      text: "text-green-600",
    };
  }

  if (productivity >= 50) {
    return {
      emoji: "😐",
      border: "border-yellow-500",
      text: "text-yellow-600",
    };
  }

  return {
    emoji: "😞",
    border: "border-red-500",
    text: "text-red-600",
  };
}
