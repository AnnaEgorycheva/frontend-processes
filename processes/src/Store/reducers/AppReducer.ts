import { getUserDataByEmailWhileInitializing,
    getUserDataByTokenWhileInitializing } from './AuthReducer';
import {InferActionsTypes} from '../store';

let initialState = {
    initialized: false as boolean,
    isMainPathname: false as boolean
};

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'INITIALIZED_SUCCESS':
            return {
                ...state,
                initialized: true
            };
        case 'SET_IS_MAIN_PATHNAME':
            return {
                ...state,
                isMainPathname: action.isMainPathname
            }
        default:
            return state;
    }
}

export const actions = {
    initializedSuccess: () => ({type: 'INITIALIZED_SUCCESS'} as const),
    setIsMainPathname: (isMainPathname: boolean) => ({type: 'SET_IS_MAIN_PATHNAME', isMainPathname} as const)
}

export const initializeApp = () => (dispatch: any) => {
    let isMainPathname = window.location.pathname === '/' ? true : false
    dispatch(actions.setIsMainPathname(isMainPathname))

    if (localStorage.getItem('token') === null)
        localStorage.setItem('token', '')
    
    if (localStorage.getItem('email') === null)
        localStorage.setItem('email', '')
    
    if (localStorage.getItem('token') !== '') {
        let promise = dispatch(getUserDataByTokenWhileInitializing());

        Promise.all([promise])
            .then(() => {
                dispatch(actions.initializedSuccess());
            });
    }
    else 
        dispatch(actions.initializedSuccess())
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>

export default appReducer;