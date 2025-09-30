import { create } from "zustand";
import { Appearance } from "react-native";

const system = Appearance.getColorScheme() === "dark" ? "dark" : "light";

export const useThemeStore = create((set) => ({
  theme: system, // 'light' | 'dark'
  setTheme: (t) => set({ theme: t }),
  toggleTheme: () => set((s) => ({ theme: s.theme === "dark" ? "light" : "dark" })),
}));
