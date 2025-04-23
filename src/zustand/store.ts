import { create, StateCreator } from "zustand";
import { createSelectors } from "./auto-selectors";
import { CurrentUser } from "../react-query/auth/identity.types";
import { authStorage } from "../utils/authStorage";

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
  logout: () => void;
  currentUser: CurrentUser | null;
  setUser: (user: CurrentUser) => void;
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
  accessToken: authStorage.getAccessToken(),
  refreshToken: authStorage.getRefreshToken(),
  currentUser: null,
  setTokens: (accessToken, refreshToken) => {
    authStorage.setAccessToken(accessToken);
    authStorage.setRefreshToken(refreshToken);
    set({ accessToken, refreshToken });
  },

  logout: () => {
    authStorage.clearTokens();
    set({ accessToken: null, refreshToken: null, currentUser: null });
  },
  setUser: (user) => set({ currentUser: user }),
});

type AppStore = CourseFilterSlice & AuthSlice;

const useAppStoreBase = create<AppStore>()((...a) => ({
  ...createCourseFilterSlice(...a),
  ...createAuthSlice(...a),
}));

export const useAppStore = createSelectors(useAppStoreBase);
