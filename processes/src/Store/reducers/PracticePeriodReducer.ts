import type {InferActionsTypes} from '../store';
import type {PracticePeriod, StudentType, UserDtoType} from '../../Types/types';
import { practiceServiceAPI } from 'API/practice-service-api';

let initialState = {
    practicePeriod: {} as PracticePeriod,
    studentsOnPracticePeriod: [] as Array<UserDtoType>,
    isPracticePeriodDataFetching: false as boolean,
    isStudentListFetching: false as boolean
}

const PracticePeriodReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET_PRACTICE_PERIOD_INFO':
            return {
                ...state,
                practicePeriod: action.practicePeriod
            };
        case 'SET_STUDENTS_ON_PRACTICE_PERIOD':
            return {
                ...state,
                studentsOnPracticePeriod: action.students
            };
        case 'SET_IS_PRACTICE_PERIOD_DATA_FETCHING':
            return {
                ...state,
                isPracticePeriodDataFetching : action.isFetching
            };
        case 'SET_IS_STUDENT_LIST_FETCHING':
            return {
                ...state,
                isStudentListFetching : action.isFetching
            };
        default:
            return state;
    }
}

export const practicePeriodReducerActions = {
    setPracticePeriodInfo: (practicePeriod: PracticePeriod) => (
        {
            type: 'SET_PRACTICE_PERIOD_INFO', 
            practicePeriod
        } as const),
    setStudentsOnPracticePeriod: (students: Array<UserDtoType>) => (
        {
            type: 'SET_STUDENTS_ON_PRACTICE_PERIOD', 
            students
        } as const),
    setIsPracticePeriodDataFetching: (isFetching: boolean) => (
        {
            type: 'SET_IS_PRACTICE_PERIOD_DATA_FETCHING', 
            isFetching
        } as const),
    setIsStudentListFetching: (isFetching: boolean) => (
        {
            type: 'SET_IS_STUDENT_LIST_FETCHING', 
            isFetching
        } as const)
}

export const getPracticePeriodInfo = (practicePeriodId: string) => (dispatch: any) => {
    dispatch(practicePeriodReducerActions.setIsPracticePeriodDataFetching(true))
    practiceServiceAPI.getPracticePeriodInfo(practicePeriodId)
        .then((data) => {
            dispatch(practicePeriodReducerActions.setPracticePeriodInfo(data))
            dispatch(practicePeriodReducerActions.setIsPracticePeriodDataFetching(false))
        })
   
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof practicePeriodReducerActions>

export default PracticePeriodReducer;