import { create } from "zustand";

export const useOutputStore = create((set) => ({
  output: false,
  setOutput: () => set((state) => ({ output: true })),
}));
