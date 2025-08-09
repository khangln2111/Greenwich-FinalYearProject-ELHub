import { create } from "zustand";

interface CourseFilterStore {
  isDesktopFilterOpen: boolean;
  isMobileFilterOpen: boolean;
  isGridView: boolean; // true = grid, false = list
  toggleDesktopFilter: () => void;
  toggleMobileFilter: () => void;
  openMobileFilter: () => void;
  closeMobileFilter: () => void;
  toggleLayout: () => void; // chuyển đổi layout
}

export const useCoursesPageStore = create<CourseFilterStore>((set) => ({
  isDesktopFilterOpen: true,
  isMobileFilterOpen: false,
  isGridView: true,
  toggleDesktopFilter: () => set((state) => ({ isDesktopFilterOpen: !state.isDesktopFilterOpen })),
  toggleMobileFilter: () => set((state) => ({ isMobileFilterOpen: !state.isMobileFilterOpen })),
  openMobileFilter: () => set({ isMobileFilterOpen: true }),
  closeMobileFilter: () => set({ isMobileFilterOpen: false }),
  toggleLayout: () => set((state) => ({ isGridView: !state.isGridView })),
}));
