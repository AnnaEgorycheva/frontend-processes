import {AppStateType} from '../store'

export const selectIsAuth = (state: AppStateType) => {
    return state.auth.isAuth
}

export const selectUserRole = (state: AppStateType) => {
    return state.auth.user.role
}

export const selectUserId = (state: AppStateType) => {
    return state.auth.user.userId
}

export const selectUserEmail = (state: AppStateType) => {
    return state.auth.user.email
}