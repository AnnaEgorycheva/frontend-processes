import type {InferActionsTypes} from '../store';
import type {PositionType, IntershipPositionType} from '../../Types/types';
import { companyAPI } from 'API/company-api';

let initialState = {
    positions: [] as Array<IntershipPositionType>
}

const positionsReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET_POSITIONS':
            return {
                ...state,
                positions : action.positions
            };
        default:
            return state;
    }
}

export const positionsReducerActions = {
    setPositions: (positions: Array<IntershipPositionType>) => (
        {
            type: 'SET_POSITIONS', 
            positions
        } as const)
}

export const getAllPositions = () => (dispatch: any) => {
    companyAPI.getIntershipPositions()
        .then(data => {
            dispatch(positionsReducerActions.setPositions(data.intershipPositions))
        })
}

export const getAllCompanyPositions = (companyId: string | number = 3) => (dispatch: any) => {
    companyAPI.getCompanyIntershipPositions(companyId)
        .then(data => {
            dispatch(positionsReducerActions.setPositions(data.intershipPositions))
        })

}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof positionsReducerActions>

export default positionsReducer;
