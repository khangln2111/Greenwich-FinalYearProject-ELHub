import { create } from "zustand";

interface CourseFilterStore {
  isDesktopFilterOpen: boolean;
  isMobileFilterOpen: boolean;
  toggleDesktopFilter: () => void;
  toggleMobileFilter: () => void;
  openMobileFilter: () => void;
  closeMobileFilter: () => void;

  chatModalOpen: boolean;
  chatLoaded: boolean;
  setChatModalOpen: (open: boolean) => void;
  openChatModal: () => void;
}

export const useCoursesPageStore = create<CourseFilterStore>((set) => ({
  isDesktopFilterOpen: true,
  isMobileFilterOpen: false,
  toggleDesktopFilter: () => set((state) => ({ isDesktopFilterOpen: !state.isDesktopFilterOpen })),
  toggleMobileFilter: () => set((state) => ({ isMobileFilterOpen: !state.isMobileFilterOpen })),
  openMobileFilter: () => set({ isMobileFilterOpen: true }),
  closeMobileFilter: () => set({ isMobileFilterOpen: false }),

  chatModalOpen: false,
  chatLoaded: false,
  setChatModalOpen: (open: boolean) => set({ chatModalOpen: open }),
  openChatModal: () =>
    set({
      chatModalOpen: true,
      chatLoaded: true,
    }),
}));
