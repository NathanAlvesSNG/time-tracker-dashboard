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

export function normalizePhaseName(phase: string): string {
  if (!phase) return "";

  const normalized = phase.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const cleaned = normalized
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ")
    .replace(/-\s+/g, "-")
    .replace(/\s+-/g, "-")
    .replace(/-+/g, "-");

  return cleaned
    .split(/[\s-]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export const phaseDisplayNames: Record<string, string> = {
  "pre-projeto": "Pré-projeto",
  "pre projeto": "Pré-projeto",
  "pré-projeto": "Pré-projeto",
  "pré projeto": "Pré-projeto",
  frontend: "Frontend",
  backend: "Backend",
  ajustes: "Ajustes",
  implantacao: "Implantação",
  implantação: "Implantação",
  Implantacao: "Implantação",
  "testes e qualidade": "Testes e Qualidade",
  "testes-e-qualidade": "Testes e Qualidade",
};

const phaseColors: Record<string, string> = {
  backend: "bg-indigo-600",
  frontend: "bg-emerald-500",
  "pre-projeto": "bg-amber-600",
  ajustes: "bg-violet-500",
  implantacao: "bg-cyan-600",
  "testes-e-qualidade": "bg-lime-600",
  default: "bg-slate-500",
};

export function getPhaseColor(phase: string): string {
  if (!phase) return phaseColors.default;

  const key = phase
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  return phaseColors[key] || phaseColors.default;
}

export function getDisplayPhaseName(normalizedPhase: string): string {
  const key = normalizedPhase.toLowerCase().trim();
  return phaseDisplayNames[key] || normalizedPhase;
}

export const PHASE_ORDER = [
  "Pré-projeto",
  "Frontend",
  "Backend",
  "Testes e Qualidade",
  "Ajustes",
  "Implantação",
] as const;
