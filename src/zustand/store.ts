import { create, StateCreator } from "zustand";
import { createSelectors } from "./auto-selectors";
import { User } from "../react-query/auth/identity.types";

interface CourseFilterSlice {
  isDesktopFilterOpen: boolean;
  isMobileFilterOpen: boolean;
  toggleDesktopFilter: () => void;
  toggleMobileFilter: () => void;
  closeMobileFilter: () => void;
}

interface AuthSlice {
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (accessToken: string, refreshToken: string) => void;
  clearTokens: () => void;
  user: User | null;
  setUser: (user: User) => void;
}

// Slice for managing the state of the course filter
export const createCourseFilterSlice: StateCreator<CourseFilterSlice> = (set) => ({
  isDesktopFilterOpen: true,
  isMobileFilterOpen: false,
  toggleDesktopFilter: () => set((state) => ({ isDesktopFilterOpen: !state.isDesktopFilterOpen })),
  toggleMobileFilter: () => set((state) => ({ isMobileFilterOpen: !state.isMobileFilterOpen })),
  closeMobileFilter: () => set({ isMobileFilterOpen: false }),
});

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  accessToken: localStorage.getItem("accessToken"),
  refreshToken: localStorage.getItem("refreshToken"),
  user: null,
  setTokens: (accessToken, refreshToken) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    set({ accessToken, refreshToken });
  },
  clearTokens: () => set({ accessToken: null, refreshToken: null, user: null }),
  setUser: (user) => set({ user }),
});

type AppStore = CourseFilterSlice & AuthSlice;

const useAppStoreBase = create<AppStore>()((...a) => ({
  ...createCourseFilterSlice(...a),
  ...createAuthSlice(...a),
}));

export const useAppStore = createSelectors(useAppStoreBase);
