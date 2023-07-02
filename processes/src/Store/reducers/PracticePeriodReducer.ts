import type {InferActionsTypes} from '../store';
import type {PracticePeriod, StudentInPeriodInfoType, 
    PracticePeriodGroupType, PracticePeriodCreateUpdate,
    SelectOptionType,
    GroupType} from '../../Types/types';
import { practiceServiceAPI } from 'API/practice-service-api';
import { userAPI } from 'API/user-api';

let initialState = {
    practicePeriod: {} as PracticePeriod,
    studentsOnPracticePeriod: [] as Array<StudentInPeriodInfoType>,
    isPracticePeriodDataFetching: false as boolean,
    isStudentListFetching: false as boolean,
    updatedPracticePeriodInfo: {
        startDate: '',
        endDate: '',
        practiceOrder: '',
        practicePeriodName: '',
        groups: [] as Array<PracticePeriodGroupType>
    } as PracticePeriodCreateUpdate,
    groupsOptions: [] as Array<SelectOptionType>,
}

const PracticePeriodReducer = (state = initialState, action: ActionsType | any): InitialStateType => {
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
        case 'SET_UPDATED_PRACTICE_PERIOD_INFO':
            return {
                ...state,
                updatedPracticePeriodInfo : action.updatedPracticePeriodInfo
            };
        case 'CLEAR_UPDATED_PRACTICE_PERIOD_INFO':
            return {
                ...state,
                updatedPracticePeriodInfo : {
                    startDate: '',
                    endDate: '',
                    practiceOrder: '',
                    practicePeriodName: '',
                    groups: []
                }
            };
        case 'SET_GROUP_OPTIONS':
            return {
                ...state,
                groupsOptions : action.options
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
    setStudentsOnPracticePeriod: (students: Array<StudentInPeriodInfoType>) => (
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
        } as const),
    clearUpdatedPracticePeriodInfo: () => (
        {
            type: 'CLEAR_UPDATED_PRACTICE_PERIOD_INFO', 
        } as const),
    setGroupsOptions: (options: Array<SelectOptionType>) => (
        {
            type: 'SET_GROUP_OPTIONS', 
            options
        } as const),
}

export const setUpdatedPracticePeriodInfo = (updatedPracticePeriodInfo: PracticePeriodCreateUpdate) => {
    return {
        type: 'SET_UPDATED_PRACTICE_PERIOD_INFO', 
        updatedPracticePeriodInfo
    }
};

export const getPracticePeriodInfo = (practicePeriodId: string) => (dispatch: any) => {
    dispatch(practicePeriodReducerActions.setIsPracticePeriodDataFetching(true))
    practiceServiceAPI.getPracticePeriodInfo(practicePeriodId)
        .then((data) => {
            dispatch(practicePeriodReducerActions.setPracticePeriodInfo(data))
            dispatch(setUpdatedPracticePeriodInfo({
                startDate: data.startDate,
                endDate: data.endDate,
                practiceOrder: data.practiceOrder,
                practicePeriodName: data.practicePeriodName,
                groups: data.groups
            }))
            dispatch(practicePeriodReducerActions.setIsPracticePeriodDataFetching(false))
        })
   
}

export const getStudentsOnPracticePeriod = (practicePeriodId: string) => (dispatch: any) => {
    dispatch(practicePeriodReducerActions.setIsStudentListFetching(true))
    practiceServiceAPI.getPracticePeriodStudents(practicePeriodId)
        .then(data => {
            dispatch(practicePeriodReducerActions.setStudentsOnPracticePeriod(data.studentInPeriodInfoDtos))
            dispatch(practicePeriodReducerActions.setIsStudentListFetching(false))
        })
}

export const getGroupSelectOptions = () => (dispatch: any) => {
    let options: Array<SelectOptionType> = []
    userAPI.getAllGroups()
        .then((groups: Array<GroupType>) => {
            groups.map(group => {
                options.push({
                    value: group.groupNumber,
                    label: group.groupNumber            
                })
            })
            dispatch(practicePeriodReducerActions.setGroupsOptions(options))
        })
}

export const updatePracticePeriod = (practicePeriodId: string) => (dispatch: any, getState: any) => {
    const updatedPracticePeriod = getState().practicePeriod.updatedPracticePeriodInfo
    practiceServiceAPI.updatePracticePeriod(
        practicePeriodId, updatedPracticePeriod.startDate, updatedPracticePeriod.endDate,
        updatedPracticePeriod.practiceOrder, updatedPracticePeriod.practicePeriodName,
        updatedPracticePeriod.groups
    )
        .then(updatedData => {
            dispatch(practicePeriodReducerActions.setIsPracticePeriodDataFetching(true))
            dispatch(practicePeriodReducerActions.clearUpdatedPracticePeriodInfo())
            practiceServiceAPI.getPracticePeriodInfo(practicePeriodId)
                .then((data) => {
                    dispatch(practicePeriodReducerActions.setPracticePeriodInfo(data))
                    dispatch(setUpdatedPracticePeriodInfo({
                        startDate: data.startDate,
                        endDate: data.endDate,
                        practiceOrder: data.practiceOrder,
                        practicePeriodName: data.practicePeriodName,
                        groups: data.groups
                    }))
                    dispatch(practicePeriodReducerActions.setIsPracticePeriodDataFetching(false))
                })
        })
        .then(() => {
            dispatch(practicePeriodReducerActions.setIsStudentListFetching(true))
            practiceServiceAPI.getPracticePeriodStudents(practicePeriodId)
                .then(data => {
                    dispatch(practicePeriodReducerActions.setStudentsOnPracticePeriod(data.studentInPeriodInfoDtos))
                    dispatch(practicePeriodReducerActions.setIsStudentListFetching(false))
                })
        })
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof practicePeriodReducerActions>

export default PracticePeriodReducer;