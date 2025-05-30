import { create } from "zustand";

const useAppStore = create((set) => ({
  filter: "",
  items: [],
  setFilter: (value) => set({ filter: value }),
  setItems: (value) => set({ items: value }),
}));

export default useAppStore;
