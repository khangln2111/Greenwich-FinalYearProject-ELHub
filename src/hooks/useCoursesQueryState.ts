import { useQueryStates, parseAsString, parseAsInteger } from "nuqs";
import { OrderBy, decodeOrderOption, encodeOrderOption } from "../api-client/api.types";
import { CourseOrderableFields } from "../features/course/course.types";

export function useCoursesQueryState() {
  const [states, setStates] = useQueryStates(
    {
      categoryId: parseAsString,
      level: parseAsString,
      orderBy: parseAsString.withDefault(
        encodeOrderOption<CourseOrderableFields>({
          field: "createdAt",
          direction: "desc",
        }),
      ),
      search: parseAsString.withDefault(""),
      page: parseAsInteger.withDefault(1),
    },
    {
      scroll: true,
    },
  );

  // Decode orderBy
  const orderBy: OrderBy<CourseOrderableFields> = decodeOrderOption(
    states.orderBy,
    "createdAt",
    "desc",
  );

  const setCoursesQueryState = (newValues: Partial<typeof states>) => {
    const keys = Object.keys(newValues);

    // Nếu chỉ thay đổi page
    if (keys.length === 1 && keys[0] === "page") {
      setStates({ page: newValues.page });
      return;
    }

    // Ngược lại: cập nhật filter/sort, reset page về null
    setStates({
      ...newValues,
      page: null,
    });
  };

  return [
    {
      ...states,
      orderBy,
    },
    setCoursesQueryState,
  ] as const;
}
