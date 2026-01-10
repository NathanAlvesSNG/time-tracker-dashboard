import { IconMoodEmpty, IconMoodHappy, IconMoodSad } from "@tabler/icons-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getProductivityUI(productivity: number) {
  if (productivity >= 80) {
    return {
      icon: IconMoodHappy,
      border: "border-green-500",
    };
  }

  if (productivity >= 50) {
    return {
      icon: IconMoodEmpty,
      border: "border-yellow-500",
    };
  }

  return {
    icon: IconMoodSad,
    border: "border-red-500",
  };
}
