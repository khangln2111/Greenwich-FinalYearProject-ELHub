import { InstructorApplicationStatus } from "../../../../features/instructorApplication/instructorApplication.types";
import { cn } from "../../../../utils/cn";

type Props = {
  value: "All" | InstructorApplicationStatus;
  onChange: (status: "All" | InstructorApplicationStatus) => void;
  statuses: ("All" | InstructorApplicationStatus)[];
};

const AdminInstructorApplicationStatusFilterBadges = ({ value, onChange, statuses }: Props) => {
  return (
    <div className="flex gap-2 flex-wrap mx-auto md:mx-[initial]">
      {statuses.map((status) => {
        const isActive = value === status;
        return (
          <button
            key={status}
            onClick={() => onChange(status)}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-150",
              isActive
                ? "bg-primary text-white "
                : "bg-gray-200 text-black hover:bg-gray-300 dark:bg-gray-400 dark:hover:bg-gray-500",
            )}
          >
            {status}
          </button>
        );
      })}
    </div>
  );
};
export default AdminInstructorApplicationStatusFilterBadges;
