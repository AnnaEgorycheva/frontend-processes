import type {InferActionsTypes} from '../store';
import type {PositionType, IntershipPositionType} from '../../Types/types';
import { companyAPI } from 'API/company-api';
import { applicationServiceAPI } from 'API/application-service-api';

let initialState = {
    positions: [] as Array<IntershipPositionType>,
    isPositionsFetching: false as boolean
}

const positionsReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET_POSITIONS':
            return {
                ...state,
                positions : action.positions
            };
        case 'SET_IS_POSITIONS_FETCHING':
            return {
                ...state,
                isPositionsFetching : action.isFetching
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
        } as const),
    setIsPositionsFetching: (isFetching: boolean) => (
        {
            type: 'SET_IS_POSITIONS_FETCHING', 
            isFetching
        } as const)
}

export const getAllPositions = () => (dispatch: any) => {
    dispatch(positionsReducerActions.setIsPositionsFetching(true))
    companyAPI.getIntershipPositions()
        .then(data => {
            dispatch(positionsReducerActions.setPositions(data.intershipPositions))
            dispatch(positionsReducerActions.setIsPositionsFetching(false))
        })
}

const connectCompanyPositionsAndApplicationsNumber = async (companyPositions: Array<IntershipPositionType>) => {
    await Promise.all(companyPositions.map(companyPosition => {
        return applicationServiceAPI.getAllApplicationsByPositionId(companyPosition.intershipPositionId)
        .then(data => {
            companyPosition.intershipPositionApplicationsCount = data.length;
        })
    }))

    return companyPositions;
}

export const getAllCompanyPositions = (companyId: string | number | null) => (dispatch: any) => {
    dispatch(positionsReducerActions.setIsPositionsFetching(true))
    companyAPI.getCompanyIntershipPositions(companyId)
        .then(data => {
            connectCompanyPositionsAndApplicationsNumber(data.intershipPositions)
                .then(companyPositionsWithApplicationsCount => {
                    dispatch(positionsReducerActions.setPositions(companyPositionsWithApplicationsCount))
                    dispatch(positionsReducerActions.setIsPositionsFetching(false))
                })
        })

}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof positionsReducerActions>

export default positionsReducer;
