import type {InferActionsTypes} from '../store';

let initialState = {
    isAuth: false,
    loginFormData: {
        login: '' as undefined | string,
        password: '' as undefined | string
    } 
}

const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET_IS_AUTH':
            return {
                ...state,
                isAuth: !state.isAuth
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
                    login: '',
                    password: ''
                }
            }
        default:
            return state
    }
}

export const authReducerActions = {
    setIsAuth: () => ({
        type: 'SET_IS_AUTH'
    } as const),
    setLoginFormData: (formData: LoginDataFormType) => ({
        type: 'SET_LOGIN_FORM_DATA',
        payload: formData
    } as const),
    clearLoginFormData: () => ({
        type: 'CLEAR_LOGIN_FORM_DATA',
    } as const),
}

export type InitialStateType = typeof initialState
export type LoginDataFormType = typeof initialState.loginFormData
type ActionsType = InferActionsTypes<typeof authReducerActions>

export default authReducer;