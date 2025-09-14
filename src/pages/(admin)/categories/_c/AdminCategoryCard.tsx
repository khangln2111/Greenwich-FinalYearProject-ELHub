import { PencilIcon } from "lucide-react";
import { CategoryVm } from "../../../../features/category/category.types";
import { Badge, Image, Button } from "@mantine/core";

type AdminCategoryCardProps = {
  category: CategoryVm;
  handleEdit: (category: CategoryVm) => void;
};

const AdminCategoryCard = ({ category, handleEdit }: AdminCategoryCardProps) => {
  return (
    <div
      key={category.id}
      className="rounded-2xl border border-gray-200 dark:border-dark-4 overflow-hidden bg-white
        dark:bg-dark-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
    >
      <div className="aspect-video overflow-hidden">
        <Image src={category.imageUrl} alt={category.name} className="w-full h-full object-cover" />
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
        <div className="flex items-center justify-between mt-auto">
          <Badge color="gray" variant="light" radius="sm" size="sm">
            {category.courseCount} course{category.courseCount !== 1 && "s"}
          </Badge>
          <Button
            variant="default"
            size="xs"
            leftSection={<PencilIcon size={14} />}
            onClick={() => handleEdit(category)}
            className="rounded-lg dark:bg-dark-4 dark:text-white"
          >
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
};
export default AdminCategoryCard;
