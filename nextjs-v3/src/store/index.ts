import { create } from 'zustand';

type UiState = {
  sidebarOpen: boolean;
  activeTeamId: string | null;
  toggleSidebar: () => void;
  setActiveTeamId: (teamId: string) => void;
};

export const useUiStore = create<UiState>((set) => ({
  sidebarOpen: true,
  activeTeamId: null,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setActiveTeamId: (activeTeamId) => set({ activeTeamId })
}));
