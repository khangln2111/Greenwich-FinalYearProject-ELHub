import { create, StateCreator } from "zustand";
import { CurrentUser } from "../react-query/auth/identity.types";
import { authStorageHelper } from "../utils/storageHelper";
import { createSelectors } from "./auto-selectors";

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

// Slice for managing the state of the sidebar
interface AuthSlice {
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
  currentUser: CurrentUser | null;
  setUser: (user: CurrentUser) => void;
}

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  accessToken: authStorageHelper.getAccessToken(),
  refreshToken: authStorageHelper.getRefreshToken(),
  currentUser: null,
  setTokens: (accessToken, refreshToken) => {
    authStorageHelper.setAccessToken(accessToken);
    authStorageHelper.setRefreshToken(refreshToken);
    set({ accessToken, refreshToken });
  },

  logout: () => {
    authStorageHelper.clearTokens();
    set({ accessToken: null, refreshToken: null, currentUser: null });
  },
  setUser: (user) => set({ currentUser: user }),
});

type AppStore = CourseFilterSlice & AuthSlice & InstructorLayoutSlice & AdminLayoutSlice;

const useAppStoreBase = create<AppStore>()((...a) => ({
  ...createCourseFilterSlice(...a),
  ...createAuthSlice(...a),
  ...createInstructorLayoutSlice(...a),
  ...createAdminLayoutSlice(...a),
}));

export const useAppStore = createSelectors(useAppStoreBase);
