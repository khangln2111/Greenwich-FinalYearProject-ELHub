import { create, StateCreator } from "zustand";
import { createSelectors } from "./auto-selectors";

interface CourseFilterSlice {
  isDesktopFilterOpen: boolean;
  isMobileFilterOpen: boolean;
  toggleDesktopFilter: () => void;
  toggleMobileFilter: () => void;
  closeMobileFilter: () => void;
}

// Slice for managing the state of the course filter
export const createCourseFilterSlice: StateCreator<CourseFilterSlice> = (set) => ({
  isDesktopFilterOpen: true,
  isMobileFilterOpen: false,
  toggleDesktopFilter: () => set((state) => ({ isDesktopFilterOpen: !state.isDesktopFilterOpen })),
  toggleMobileFilter: () => set((state) => ({ isMobileFilterOpen: !state.isMobileFilterOpen })),
  closeMobileFilter: () => set({ isMobileFilterOpen: false }),
});

type AppStore = CourseFilterSlice;

const useAppStoreBase = create<AppStore>()((...a) => ({
  ...createCourseFilterSlice(...a),
}));

export const useAppStore = createSelectors(useAppStoreBase);
