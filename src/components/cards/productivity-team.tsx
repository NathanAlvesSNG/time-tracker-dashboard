import { IconTrophy } from "@tabler/icons-react";
import DashboardCard from "../dashboard-card";

type Props = {
  label: string;
};

export default function ProductivityTeamCard({ label }: Props) {
  return (
    <DashboardCard
      title="Produtividade do Time"
      description="Comparação da produtividade entre você e seu time."
      icon={IconTrophy}
      value={label}
    />
  );
}
