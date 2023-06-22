import type {BaseThunkType, InferActionsTypes} from '../store';
import type {UserDtoType} from '../../Types/types';
import { userAPI } from 'API/user-api';
import { useNavigate } from 'react-router-dom';

let initialState = {
    user: {} as UserDtoType,
    isAuth: false,
    loginFormData: {
        email: '' as string | null ,
        password: '' as string | null 
    } 
}

const authReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case 'SET_USER_DATA':
            return {
                ...state,
                user: action.user
            }
        case 'SET_IS_AUTH':
            return {
                ...state,
                isAuth: action.isAuth
            }
        case 'SET_LOGIN_FORM_DATA':
            return {
                ...state,
                loginFormData: action.payload
            }
        case 'CLEAR_LOGIN_FORM_DATA':
            return {
                ...state,
                loginFormData : {
                    email: '',
                    password: ''
                }
            }
        default:
            return state
    }
}

export const setUserData = (user: UserDtoType) => {
    return {
        type: 'SET_USER_DATA',
        user }
};
export const setIsAuth = (isAuth: boolean) => {
    return {
        type: 'SET_IS_AUTH',
        isAuth }
};
export const setToken = (token: string) => {
    return {
        type: 'SET_TOKEN',
        token }
};
export const setLoginFormData = (formData: LoginDataFormType) => {
    return {
        type: 'SET_LOGIN_FORM_DATA',
        payload: formData }
};
export const clearLoginFormData = () => {
    return { type: 'CLEAR_LOGIN_FORM_DATA'}
};

export const getUserData = (email: string | null)=> async (dispatch: any) => {
    let userData = await userAPI.getUsersByEmail(email)
    dispatch(setUserData(userData))
}

export const login = (loginData: LoginDataFormType) => (dispatch: any) => {
    userAPI.authenticate(loginData.email, loginData.password)
    .then(data => {
        let token = data.jwtToken
        localStorage.setItem('token', `Bearer ${token}`)
        dispatch(clearLoginFormData())
    })
    .then(() => {
        userAPI.getUsersByEmail(loginData.email)
        .then(userData => {
            dispatch(setUserData(userData))
            dispatch(setIsAuth(true))
            return userData.role
        })
        .then((role) => {
            switch (role) {
                case 'STUDENT': window.history.pushState(null, '', "companies"); break
                case 'SCHOOL': window.history.pushState(null, '', "students"); break
                case 'COMPANY': window.history.pushState(null, '', "positions"); break
            }
        })
    })
}

export const logout = () => async (dispatch: any) => {
    dispatch(setUserData({
        userId: '',
        firstName: '',
        lastName: '',
        patronym: '',
        role: '',
        email: ''
    }))
    dispatch(setIsAuth(false))
    localStorage.setItem('token', '')
    window.history.pushState(null, '', "login")
}

// export const authReducerActions = {
//     setUserData: (user: UserDtoType) => ({
//         type: 'SET_USER_DATA',
//         user
//     } as const),
//     setIsAuth: (isAuth: boolean) => ({
//         type: 'SET_IS_AUTH',
//         isAuth
//     } as const),
//     setToken: (token: string) => ({
//         type: 'SET_TOKEN',
//         token
//     } as const),
//     setLoginFormData: (formData: LoginDataFormType) => ({
//         type: 'SET_LOGIN_FORM_DATA',
//         payload: formData
//     } as const),
//     clearLoginFormData: () => ({
//         type: 'CLEAR_LOGIN_FORM_DATA',
//     } as const),
// }

// export const getUserData = (email: string | null): ThunkType => async (dispatch) => {
//     let userData = await userAPI.getUsersByEmail(email)
//     dispatch(authReducerActions.setUserData(userData))
// }

// export const login = (loginData: LoginDataFormType): ThunkType => async (dispatch) => {
//     let data = await userAPI.authenticate(loginData.email, loginData.password)
//     let token = data.jwtToken
//     dispatch(getUserData(loginData.email))
//     dispatch(authReducerActions.setIsAuth(true))
//     dispatch(authReducerActions.setToken(token))
//     localStorage.setItem('token', `Bearer ${token}`)
// }

// export const logout = (): ThunkType => async (dispatch: any) => {
//     dispatch(authReducerActions.setUserData({
//         userId: '',
//         firstName: '',
//         lastName: '',
//         patronym: '',
//         role: '',
//         email: ''
//     }))
//     dispatch(authReducerActions.setIsAuth(false))
//     dispatch(authReducerActions.setToken(''))
//     localStorage.setItem('token', '')
// }

export default authReducer;

export type InitialStateType = typeof initialState
export type LoginDataFormType = typeof initialState.loginFormData
// type ActionsType = InferActionsTypes<typeof authReducerActions>
type ActionsType = InferActionsTypes<typeof setUserData & typeof setIsAuth & 
                                     typeof setToken & typeof setLoginFormData & 
                                     typeof clearLoginFormData>
type ThunkType = BaseThunkType<ActionsType>
