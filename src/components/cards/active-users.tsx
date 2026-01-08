import { IconUsers } from "@tabler/icons-react";
import DashboardCard from "../dashboard-card";

export default function ActiveUsersCard() {
  return (
    <DashboardCard
      title="Usuários Ativos"
      value="15"
      icon={IconUsers}
      description="Você tem 15 usuários trabalhando atualmente"
      sourceSystem="Ambos"
    />
  );
}
