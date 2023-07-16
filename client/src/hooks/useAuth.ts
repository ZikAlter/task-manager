import {useAppSelector} from "../store/hooks.ts";

export const useAuth = (): boolean => {
    const isAuth = useAppSelector((state) => state.user.isAuth)
    return isAuth
}

export const useData = (): any => {
    const data = useAppSelector((state) => state.user)
    return data
}