import type {BaseThunkType, InferActionsTypes} from '../store';
import type {UserDtoType} from '../../Types/types';
import { userAPI } from 'API/user-api';
import axios from 'axios';

let initialState = {
    user: {} as UserDtoType,
    isAuth: false,
    loginFormData: {
        email: '' as string ,
        password: '' as string 
    },
    isAuthSuccess: false as boolean 
}
// {
//     userId: "a4ed37c5-f27e-4f54-964a-934ac3acbb11",
//     firstName: "Студент",
//     lastName: "Студентов",
//     patronym: "Студентович",
//     role: "STUDENT",
//     email: "student@tester.com",
//     groupNumber: "872359",
//     companyId: null
//   }

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
        case 'SET_IS_AUTH_SUCCESS':
            return {
                ...state,
                isAuthSuccess: action.isSuccess
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
export const setIsAuthSuccess = (isSuccess: boolean) => {
    return { type: 'SET_IS_AUTH_SUCCESS', isSuccess}
};

export const getUserDataByEmailWhileInitializing = () => async (dispatch: any) => {
    let userData = await userAPI.getUsersByEmail(localStorage.getItem('email'))
    dispatch(setUserData(userData))
    localStorage.setItem('email', userData.email)
    dispatch(setIsAuth(true))
}

export const getUserDataByTokenWhileInitializing = () => async (dispatch: any) => {
    let userData = await userAPI.getUsersByToken()
    dispatch(setUserData(userData))
    localStorage.setItem('email', userData.email)
    dispatch(setIsAuth(true))
    dispatch(setIsAuthSuccess(true))
}

export const login = (loginData: LoginDataFormType) => (dispatch: any) => {
    dispatch(setIsAuth(false))
    dispatch(setIsAuthSuccess(false))
    userAPI.authenticate(loginData.email, loginData.password)
        .then(data => {
            let token = data.jwtToken
            localStorage.setItem('token', `Bearer ${token}`)
            localStorage.setItem('email', loginData.email)
            dispatch(clearLoginFormData())
        })
        .then(() => {
            userAPI.getUsersByToken()
                .then(userData => {
                    dispatch(setUserData(userData))
                    dispatch(setIsAuth(true))
                    dispatch(setIsAuthSuccess(true))
                })
        })

}

export const logout = () => (dispatch: any) => {
    dispatch(setUserData({
        userId: '',
        firstName: '',
        lastName: '',
        patronym: '',
        role: '',
        email: '',
        groupNumber: null,
        companyId: null
    }))
    dispatch(setIsAuth(false))
    localStorage.setItem('token', '')
    localStorage.setItem('email', '')
    window.history.pushState(null, '', "login")
}

export default authReducer;

export type InitialStateType = typeof initialState
export type LoginDataFormType = typeof initialState.loginFormData
type ActionsType = InferActionsTypes<typeof setUserData & typeof setIsAuth & 
                                     typeof setToken & typeof setLoginFormData & 
                                     typeof clearLoginFormData>
type ThunkType = BaseThunkType<ActionsType>
