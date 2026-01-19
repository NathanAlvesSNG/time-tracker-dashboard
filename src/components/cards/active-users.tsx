import { IconUsers } from "@tabler/icons-react";
import DashboardCard from "../dashboard-card";

type Props = {
  usersQuantity: number;
};

export default function ActiveUsersCard({ usersQuantity }: Props) {
  return (
    <DashboardCard
      title="Usuários Ativos"
      value={usersQuantity}
      icon={IconUsers}
      description="Número de usuários atualmente ativos"
    />
  );
}
