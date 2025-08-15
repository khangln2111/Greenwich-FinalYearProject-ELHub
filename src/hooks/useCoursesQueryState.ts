import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
  useQueryStates,
} from "nuqs";
import { OrderBy, decodeOrderOption, encodeOrderOption } from "../api-client/api.types";
import { CourseLevel, CourseOrderableFields } from "../features/course/course.types";

export function useCourseQueryState() {
  const [states, setCourseQuery] = useQueryStates(
    {
      categoryId: parseAsString,
      levels: parseAsArrayOf(parseAsStringEnum(Object.values(CourseLevel))).withDefault([]),
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
      setCourseQuery({ page: newValues.page });
      return;
    }

    // Ngược lại: cập nhật filter/sort, reset page về null
    setCourseQuery({
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
