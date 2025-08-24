import { Button, Title } from "@mantine/core";
import { RefreshCw } from "lucide-react";

const UserDashboardPage = () => {
  return (
    <div>
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <Title order={2} className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Personal Dashboard
            </Title>
            <span className="text-sm text-gray-500">Overview & insights</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Updated: {new Date().toLocaleString()}
          </span>

          <Button leftSection={<RefreshCw className="size-4" />} variant="default">
            Refresh
          </Button>
        </div>
      </header>
    </div>
  );
};
export default UserDashboardPage;
