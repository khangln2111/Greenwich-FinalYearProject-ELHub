import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
  useQueryStates,
} from "nuqs";
import { OrderBy, decodeOrderOption, encodeOrderOption } from "../api-client/api.types";
import {
  CourseLevel,
  CourseOrderableFields,
  CoursePriceMode,
} from "../features/course/course.types";

export function useCourseQueryState() {
  const defaultValues = {
    categoryId: null,
    levels: [] as CourseLevel[],
    orderBy: encodeOrderOption<CourseOrderableFields>({
      field: "createdAt",
      direction: "desc",
    }),
    minDurationInSeconds: null,
    maxDurationInSeconds: null,
    minPrice: null,
    maxPrice: null,
    search: "",
    priceModes: [] as CoursePriceMode[],
    page: 1,
  };

  const [states, setCourseQuery] = useQueryStates(
    {
      categoryId: parseAsString,
      levels: parseAsArrayOf(parseAsStringEnum(Object.values(CourseLevel))).withDefault(
        defaultValues.levels,
      ),
      orderBy: parseAsString.withDefault(defaultValues.orderBy),
      minDurationInSeconds: parseAsInteger,
      maxDurationInSeconds: parseAsInteger,
      minPrice: parseAsInteger,
      maxPrice: parseAsInteger,
      search: parseAsString.withDefault(defaultValues.search),
      priceModes: parseAsArrayOf(parseAsStringEnum(Object.values(CoursePriceMode))).withDefault(
        defaultValues.priceModes,
      ),
      page: parseAsInteger.withDefault(defaultValues.page),
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

    // If only the page is changed
    if (keys.length === 1 && keys[0] === "page") {
      setCourseQuery({ page: newValues.page });
      return;
    }

    // Otherwise: update filter/sort, reset page to null
    setCourseQuery({
      ...newValues,
      page: null,
    });
  };

  const resetCoursesQueryState = () => {
    setCourseQuery({
      ...defaultValues,
      search: states.search,
    });
  };

  return [
    {
      ...states,
      orderBy,
    },
    setCoursesQueryState,
    resetCoursesQueryState,
  ] as const;
}
