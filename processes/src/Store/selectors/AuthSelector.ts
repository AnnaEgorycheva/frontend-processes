import {AppStateType} from '../store'

export const selectIsAuth = (state: AppStateType) => {
    return state.auth.isAuth
}

export const selectUserRole = (state: AppStateType) => {
    return state.auth.user.role
}