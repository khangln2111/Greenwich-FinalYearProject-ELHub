interface CourseStatItemProps {
  icon: React.ElementType;
  value: string | number;
  label: string;
}

const AdminCourseCardStat = ({ icon: Icon, value, label }: CourseStatItemProps) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-md bg-gray-100 dark:bg-zinc-800 px-2 py-2">
      <Icon size={18} className="mb-1" />
      <span className="font-medium">{value}</span>
      <span className="text-sm text-gray-800 dark:text-gray-300">{label}</span>
    </div>
  );
};

export default AdminCourseCardStat;
