import { create, StateCreator } from "zustand";
import { createSelectors } from "../auto-selectors";

interface AdminLayoutSlice {
  desktopAdminSidebarCollapsed: boolean;
  toggleDesktopAdminSidebar: () => void;
  mobileAdminSidebarOpened: boolean;
  openMobileAdminSidebar: () => void;
  closeMobileAdminSidebar: () => void;
}

export const createAdminLayoutSlice: StateCreator<AdminLayoutSlice> = (set) => ({
  desktopAdminSidebarCollapsed: false,
  toggleDesktopAdminSidebar: () =>
    set((state) => ({
      desktopAdminSidebarCollapsed: !state.desktopAdminSidebarCollapsed,
    })),
  mobileAdminSidebarOpened: false,
  openMobileAdminSidebar: () => set({ mobileAdminSidebarOpened: true }),
  closeMobileAdminSidebar: () => set({ mobileAdminSidebarOpened: false }),
});

// Slice for managing the state of the instructor layout
interface InstructorLayoutSlice {
  desktopInstructorSidebarCollapsed: boolean;
  toggleDesktopInstructorSidebar: () => void;
  mobileInstructorSidebarOpened: boolean;
  openMobileInstructorSidebar: () => void;
  closeMobileInstructorSidebar: () => void;
}

export const createInstructorLayoutSlice: StateCreator<InstructorLayoutSlice> = (set) => ({
  desktopInstructorSidebarCollapsed: false,
  toggleDesktopInstructorSidebar: () =>
    set((state) => ({
      desktopInstructorSidebarCollapsed: !state.desktopInstructorSidebarCollapsed,
    })),
  mobileInstructorSidebarOpened: false,
  openMobileInstructorSidebar: () => set({ mobileInstructorSidebarOpened: true }),
  closeMobileInstructorSidebar: () => set({ mobileInstructorSidebarOpened: false }),
});

// Slice for managing the state of the course filter

type AppStore = InstructorLayoutSlice & AdminLayoutSlice;

const useAppStoreBase = create<AppStore>()((...a) => ({
  ...createInstructorLayoutSlice(...a),
  ...createAdminLayoutSlice(...a),
}));

export const useAppStore = createSelectors(useAppStoreBase);
