import { create } from "zustand";

interface UtilsState {
  isSidebarOpen: boolean;
}

interface UtilsActions {
  toggleSidebar: (isSidebarOpen: boolean) => void;
}

const initialState: UtilsState = {
  isSidebarOpen: false,
};

export const useUtilsStore = create<UtilsState & UtilsActions>()((set) => ({
  ...initialState,

  // if value is sent, set the sidebar status to the value, else toggle the status
  toggleSidebar: (open: boolean) =>
    set((state) => ({ isSidebarOpen: open ? open : !state.isSidebarOpen })),
}));
