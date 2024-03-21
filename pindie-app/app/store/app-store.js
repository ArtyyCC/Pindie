import { create } from 'zustand';
import { getJWT, setJWT, removeJWT, getMe } from '../api/api utils';
import { endpoints } from '../api/config';
import {router} from "next/client";
import {useRouter} from "next/navigation";

export const useStore = create((set) => ({
    isAuth: null,
    user: undefined,
    token: null,
    login: (user, token) => {
        set({ isAuth: true, user, token });
        setJWT(token);
    },
    logout: () => {
        set({ isAuth: false, user: null, token: null });
        removeJWT();
    },
    checkAuth: async () => {
        const jwt = getJWT();
        if (jwt) {
            const user = await getMe(endpoints.me, jwt);
            if (user) {
                set({ isAuth: true, user, token: jwt });
                setJWT(jwt);
            } else {
                set({ isAuth: false, user: null, token: null });
                removeJWT();
            }
        } else {
            set({ isAuth: false, user: null, token: null });
        }
    },
}));