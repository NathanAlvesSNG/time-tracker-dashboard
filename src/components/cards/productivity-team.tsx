import { IconTrophy } from "@tabler/icons-react";
import DashboardCard from "../dashboard-card";

export default function ProductivityTeamCard() {
  return (
    <DashboardCard
      title="Produtividade do Time"
      description="Comparação da produtividade entre você e seu time."
      icon={IconTrophy}
      value={"Muito acima da média"}
    />
  );
}
