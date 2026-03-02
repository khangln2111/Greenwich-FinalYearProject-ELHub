interface CourseStatItemProps {
  icon: React.ElementType;
  value: string | number;
  label: string;
}

const AdminCourseCardStat = ({ icon: Icon, value, label }: CourseStatItemProps) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-md bg-gray-100 dark:bg-dark-5 px-2 py-2">
      <Icon size={20} className="mb-2" />
      <span className="font-bold text-sm">{value}</span>
      <span className="text-sm">{label}</span>
    </div>
  );
};

export default AdminCourseCardStat;
