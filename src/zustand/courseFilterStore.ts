import { create, StateCreator } from "zustand";

interface CourseFilterSlice {
  isDesktopFilterOpen: boolean;
  isMobileFilterOpen: boolean;
  toggleDesktopFilter: () => void;
  toggleMobileFilter: () => void;
  openMobileFilter: () => void;
  closeMobileFilter: () => void;
}

export const createCourseFilterSlice: StateCreator<CourseFilterSlice> = (set) => ({
  isDesktopFilterOpen: true,
  isMobileFilterOpen: false,
  toggleDesktopFilter: () => set((state) => ({ isDesktopFilterOpen: !state.isDesktopFilterOpen })),
  toggleMobileFilter: () => set((state) => ({ isMobileFilterOpen: !state.isMobileFilterOpen })),
  closeMobileFilter: () => set({ isMobileFilterOpen: false }),
  openMobileFilter: () => set({ isMobileFilterOpen: true }),
});

type CourseFilterStore = CourseFilterSlice;

export const useCourseFilterStore = create<CourseFilterStore>()((...a) => ({
  ...createCourseFilterSlice(...a),
}));
