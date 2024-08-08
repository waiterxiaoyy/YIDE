import { create } from "zustand";


export const userStore = create<{
    username: string,
    setUserName: (username: string) => void,
}>(set => ({
    username: '',
    setUserName: (username: string) => set({ username }),
}));
