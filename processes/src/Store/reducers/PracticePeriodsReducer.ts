import type {InferActionsTypes} from '../store';
import type {PracticePeriodInfo, PracticePeriodCreateUpdate} from '../../Types/types';
import { practiceServiceAPI } from 'API/practice-service-api';

let initialState = {
    practicePeriods: [] as Array<PracticePeriodInfo>,
    isPracticePeriodsFetching: false as boolean,
    newPracticePeriod: {
        startDate: '',
        endDate: '',
        practiceOrder: '',
        practicePeriodName: ''
    } as PracticePeriodCreateUpdate
}

const practicePeriodsReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET_PRACTICE_PERIODS':
            return {
                ...state,
                practicePeriods : action.practicePeriods
            };
        case 'SET_IS_PRACTICE_PERIODS_FETCHING':
            return {
                ...state,
                isPracticePeriodsFetching : action.isFetching
            };
        case 'SET_NEW_PRACTICE_PERIOD_DATA':
            return {
                ...state,
                newPracticePeriod : action.newPracticePeriod
            };
        case 'CLEAR_NEW_PRACTICE_PERIOD_DATA':
            return {
                ...state,
                newPracticePeriod : {
                    startDate: '',
                    endDate: '',
                    practiceOrder: '',
                    practicePeriodName: ''
                }
            };
        default:
            return state;
    }
}

export const practicePeriodsReducerActions = {
    setPracticePeriods: (practicePeriods: Array<PracticePeriodInfo>) => (
        {
            type: 'SET_PRACTICE_PERIODS', 
            practicePeriods
        } as const),
    setIsPracticePeriodsFetching: (isFetching: boolean) => (
        {
            type: 'SET_IS_PRACTICE_PERIODS_FETCHING', 
            isFetching
        } as const),
    setNewPracticePeriodData: (newPracticePeriod: PracticePeriodCreateUpdate) => (
        {
            type: 'SET_NEW_PRACTICE_PERIOD_DATA', 
            newPracticePeriod
        } as const),
    clearNewPracticePeriodData: () => (
        {
            type: 'CLEAR_NEW_PRACTICE_PERIOD_DATA'
        } as const),
}

export const getAllPracticePeriods = () => (dispatch: any) => {
    dispatch(practicePeriodsReducerActions.setIsPracticePeriodsFetching(true))
    practiceServiceAPI.getPracticePeriods()
        .then(data => {
            dispatch(practicePeriodsReducerActions.setPracticePeriods(data.practicePeriods))
            dispatch(practicePeriodsReducerActions.setIsPracticePeriodsFetching(false))
        })
}

export const createNewPracticePeriod = () => (dispatch: any, getState: any) => {
    const newPracticePeriodToCreate = getState().practicePeriods.newPracticePeriod
    practiceServiceAPI.createNewPracticePeriod(
        newPracticePeriodToCreate.startDate, newPracticePeriodToCreate.endDate,
        newPracticePeriodToCreate.practiceOrder, newPracticePeriodToCreate.practicePeriodName
    )
        .then((data) => {
            dispatch(practicePeriodsReducerActions.clearNewPracticePeriodData())
            dispatch(practicePeriodsReducerActions.setIsPracticePeriodsFetching(true))
            practiceServiceAPI.getPracticePeriods()
                .then(data => {
                    dispatch(practicePeriodsReducerActions.setPracticePeriods(data.practicePeriods))
                    dispatch(practicePeriodsReducerActions.setIsPracticePeriodsFetching(false))
                })
        })
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof practicePeriodsReducerActions>

export default practicePeriodsReducer;