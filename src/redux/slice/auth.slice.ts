import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { User, UserInfo } from 'firebase/auth';
import { auth } from 'src/hooks/useFirebase';

const userInfoKeys = ['displayName', 'email', 'phoneNumber', 'photoURL', 'providerId', 'uid'];
// type Mutable<T> = { -readonly [P in keyof T]: T[P] }

const generateState = (obj: User): UserInfo => {
    const filteredObject: UserInfo = Object.assign({}, obj);

    const userKeys = Object.keys(filteredObject);

    userKeys.forEach((key) => {
        if (!userInfoKeys.includes(key)) delete filteredObject[key as keyof UserInfo]
    })

    return filteredObject;
};

const initialState: UserInfo | null = auth.currentUser ? generateState(auth.currentUser) : null;

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        invalidateAuthSlice: () => {
            return null;
        },
        setUser: (_, action: PayloadAction<User | null>) => {
            return action.payload ? generateState(action.payload) : null;
        },
        rehydrateAuthSlice: () => {
            return auth.currentUser ? generateState(auth.currentUser) : null;
        }
    },
})

// Action creators are generated for each case reducer function
export const { setUser, invalidateAuthSlice, rehydrateAuthSlice } = authSlice.actions

export default authSlice.reducer