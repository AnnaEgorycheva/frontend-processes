import { getUserDataByEmailWhileInitializing } from './AuthReducer';
import {InferActionsTypes} from '../store';

let initialState = {
    initialized: false
};

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'INITIALIZED_SUCCESS':
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
}

export const actions = {
    initializedSuccess: () => ({type: 'INITIALIZED_SUCCESS'} as const)
}

export const initializeApp = () => (dispatch: any) => {
    console.log('is initializing')
    if (localStorage.getItem('token') !== '' && localStorage.getItem('email') !== '') {
        let promise = dispatch(getUserDataByEmailWhileInitializing(localStorage.getItem('email')));

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