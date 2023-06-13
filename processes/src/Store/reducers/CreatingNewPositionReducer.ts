import type {InferActionsTypes} from '../store';

let initialState = {
    isModalOpened: false,
    newPosition: {
        name: '' as undefined | string,
        description: '' as undefined | string,
        skills: '' as undefined | string,
        places: '' as undefined | string
    } 
}

const creatingNewPositionReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case 'TOGGLE_IS_MODAL_OPENED':
            return {
                ...state,
                isModalOpened: !state.isModalOpened
            }
        case 'SET_NEW_POSITION':
            return {
                ...state,
                newPosition: action.payload
            }
        case 'CLEAR_NEW_POSITION_DATA':
            return {
                ...state,
                newPosition : {
                    name: '',
                    description: '',
                    skills: '',
                    places: ''
                }
            }
        default:
            return state
    }
}

export const creatingNewPositionReducerActions = {
    toggleIsModalOpened: () => ({
        type: 'TOGGLE_IS_MODAL_OPENED'
    } as const),
    setNewPosition: (newPosition: NewPositionType) => ({
        type: 'SET_NEW_POSITION',
        payload: newPosition
    } as const),
    clearNewPositionData: () => ({
        type: 'CLEAR_NEW_POSITION_DATA'
    })
}

export type InitialStateType = typeof initialState
export type NewPositionType = typeof initialState.newPosition
type ActionsType = InferActionsTypes<typeof creatingNewPositionReducerActions>

export default creatingNewPositionReducer;