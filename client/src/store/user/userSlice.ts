import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import {IUser} from "../../types/types.ts";

// Define a type for the slice state
interface UserState {
    user: IUser | null, // IUser | null
    isAuth: boolean
}

// Define the initial state using that type
const initialState: UserState = {
    user: null, isAuth: false
}

export const userSlice = createSlice({
    name: 'user',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        logan: (state, action: PayloadAction<IUser>) => { // при авторизации
            state.user = action.payload // сохраняем данные пользователя в storage
            state.isAuth = true // ставим флаг авторизован
        },
        logout: (state) => { // при выход из сайта
            state.isAuth = false // ставим флаг неавторизован
            state.user = null // обнуляем данные в storage
        }
    },
})

export const {logan, logout} = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.user

export default userSlice.reducer