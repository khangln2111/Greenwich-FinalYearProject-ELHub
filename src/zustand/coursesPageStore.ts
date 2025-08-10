import { create } from "zustand";

export type CoursesPageLayout = "grid" | "list";

interface CourseFilterStore {
  isDesktopFilterOpen: boolean;
  isMobileFilterOpen: boolean;
  layout: CoursesPageLayout;
  toggleDesktopFilter: () => void;
  toggleMobileFilter: () => void;
  openMobileFilter: () => void;
  closeMobileFilter: () => void;
  setLayout: (layout: CoursesPageLayout) => void;
}

export const useCoursesPageStore = create<CourseFilterStore>((set) => ({
  isDesktopFilterOpen: true,
  isMobileFilterOpen: false,
  layout: "grid",
  toggleDesktopFilter: () => set((state) => ({ isDesktopFilterOpen: !state.isDesktopFilterOpen })),
  toggleMobileFilter: () => set((state) => ({ isMobileFilterOpen: !state.isMobileFilterOpen })),
  openMobileFilter: () => set({ isMobileFilterOpen: true }),
  closeMobileFilter: () => set({ isMobileFilterOpen: false }),
  setLayout: (layout) => set({ layout }),
}));
