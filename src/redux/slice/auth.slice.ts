import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { User } from 'firebase/auth';
import { auth } from 'src/hooks/useFirebase';

// export type AuthState = User | null;
const fnKeys = ["delete", "getIdToken", "getIdTokenResult", "reload", "toJson"];
export type AuthState = Omit<User, "delete" | "getIdToken" | "getIdTokenResult" | "reload" | "toJson"> | null

const generateState = (obj: Record<string, any>): AuthState => {
    const filteredObject: Record<string, any> = {};

    const remKey = Object.keys(Object.assign({}, auth.currentUser)).filter((k) => !fnKeys.includes(k))

    remKey.forEach(key => {
        if (obj.hasOwnProperty(key)) {
            filteredObject[key] = obj[key];
        }
    });

    return filteredObject as AuthState;
};

const initialState: AuthState = auth.currentUser ? generateState(auth.currentUser) : null;

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        invalidateAuthSlice: () => {
            return auth.currentUser;
        },
        setUser: (_, action: PayloadAction<User | null>) => {
            return action.payload ? generateState(action.payload) : null;
        }
    },
})

// Action creators are generated for each case reducer function
export const { setUser, invalidateAuthSlice } = authSlice.actions

export default authSlice.reducer