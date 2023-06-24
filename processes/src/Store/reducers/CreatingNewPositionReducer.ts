import { companyAPI } from 'API/company-api';
import type {InferActionsTypes} from '../store';
import {IntersipPositionCreationType} from '../../Types/types'
import { positionsReducerActions } from './PositionsReducer';

let initialState = {
    newPosition: {
        companyId: 3,
        intershipPositionName: '',
        intershipPositionDescription: '',
        intershipPositionskills: '',
        intershipPositionCount: ''
    } as IntersipPositionCreationType
}

const creatingNewPositionReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case 'SET_NEW_POSITION': {
            return {
                ...state,
                newPosition: action.payload
            }
        }
        case 'CLEAR_NEW_POSITION_DATA':
            return {
                ...state,
                newPosition : {
                    companyId: 3,
                    intershipPositionName: '',
                    intershipPositionDescription: '',
                    intershipPositionskills: '',
                    intershipPositionCount: ''
                }
            }
        default:
            return state
    }
}

export const creatingNewPositionReducerActions = {
    setNewPosition: (newPosition: IntersipPositionCreationType) => ({
        type: 'SET_NEW_POSITION',
        payload: newPosition
    } as const),
    clearNewPositionData: () => ({
        type: 'CLEAR_NEW_POSITION_DATA'
    })
}

// export const createNewCompanyPosition = (newPositionToCreate: IntersipPositionCreationType) => (dispatch: any) => {
//     companyAPI.createIntershipPosition(
//         newPositionToCreate.companyId, newPositionToCreate.intershipPositionName, 
//         newPositionToCreate.intershipPositionDescription, newPositionToCreate.intershipPositionCount)
//         .then(() => {
//             dispatch(creatingNewPositionReducerActions.clearNewPositionData())
//             companyAPI.getCompanyIntershipPositions(newPositionToCreate.companyId)
//             .then(data => {
//                 dispatch(positionsReducerActions.setPositions(data.intershipPositions))
//             })
//         })

// }

export const createNewCompanyPosition = () => (dispatch: any, getState: any) => {
    const newPositionToCreate = getState().creatingNewPosition.newPosition
    companyAPI.createIntershipPosition(
        newPositionToCreate.companyId, newPositionToCreate.intershipPositionName, 
        newPositionToCreate.intershipPositionDescription, newPositionToCreate.intershipPositionCount)
        .then(() => {
            dispatch(creatingNewPositionReducerActions.clearNewPositionData())
            companyAPI.getCompanyIntershipPositions(newPositionToCreate.companyId)
            .then(data => {
                dispatch(positionsReducerActions.setPositions(data.intershipPositions))
            })
        })

}


export type InitialStateType = typeof initialState
export type NewPositionType = typeof initialState.newPosition
type ActionsType = InferActionsTypes<typeof creatingNewPositionReducerActions>

export default creatingNewPositionReducer;