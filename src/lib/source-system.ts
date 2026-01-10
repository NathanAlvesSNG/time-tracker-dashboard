import { BadgeProps } from "@/components/ui/badge";
import { SourceSystem } from "@/types/api";
import { IconType } from "react-icons/lib";
import { VscAzureDevops } from "react-icons/vsc";
import { FaTicket } from "react-icons/fa6";
import { IoLayers } from "react-icons/io5";

export const sourceSystemConfig: Record<
  SourceSystem,
  {
    label: string;
    variant: BadgeProps["variant"];
    className?: string;
    icon: IconType;
  }
> = {
  "Azure DevOps": {
    label: "Azure DevOps",
    variant: "outline",
    className: "text-blue-600 border-blue-600",
    icon: VscAzureDevops,
  },
  GLPI: {
    label: "GLPI",
    variant: "outline",
    className: "text-yellow-600 border-yellow-600",
    icon: FaTicket,
  },
  All: {
    label: "Ambos",
    variant: "default",
    icon: IoLayers,
  },
};
