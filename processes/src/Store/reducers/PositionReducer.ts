import type {InferActionsTypes} from '../store';
import type {PositionType, StudentType, IntershipPositionType} from '../../Types/types';
import { companyAPI } from 'API/company-api';
import { ResultCodesEnum } from 'API/api';

//     intershipPositionId: string;
//     companyId: number | string;
//     companyName: string;
//     intershipPositionName: string;
//     intershipPositionDescription?: string | null | undefined;
//     intershipPositionCount: number | string;

let initialState = {
    positionInfo: {} as IntershipPositionType,
    positionInfoIsFetching: true as boolean,
    studentsOnPosition: [
        {
            id: '1',
            firstName: 'Иван',
            lastName: 'Иванов',
            patronym: 'Иванович',
            role: 'student',
            email: 'email'
        },
        {
            id: '2',
            firstName: 'Петр',
            lastName: 'Петров',
            patronym: 'Петрович',
            role: 'student',
            email: 'email'
        }

    ] as Array<StudentType>,
    isStudentAppliedAnApplication: true,
    updatedPositionInfo: {
        id: '',
        name: '',
        description: '',
        skills: '',
        places: null,
        companyName: '',
        applicationsNumber: null
    }as PositionType
}

const positionReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET_POSITION_INFO':
            return {
                ...state,
                positionInfo: action.positionInfo
            };
        case 'SET_POSITION_INFO_IS_FETCHING':
             return {
                ...state,
                positionInfoIsFetching: action.positionInfoIsFetching
            };
        case 'SET_STUDENTS_ON_POSITION':
            return {
                ...state,
                studentsOnPosition: action.studentOnPosition
            };
        case 'SET_IS_STUDENT_APPLIED_AN_APPLICATION':
            return {
                ...state,
                isStudentAppliedAnApplication: action.isApplied
            };
        case 'SET_UPDATED_POSITION_INFO':
            return {
                ...state,
                updatedPositionInfo: action.newInfoAboutPosition
            };
        default:
            return state;
    }
}

export const positionReducerActions = {
    setPositionInfo: (positionInfo: IntershipPositionType) => ({
        type: 'SET_POSITION_INFO',
        positionInfo: positionInfo
    } as const),
    setPositionInfoIsFetching: (isFetching: boolean) => ({
        type: 'SET_POSITION_INFO_IS_FETCHING',
        positionInfoIsFetching: isFetching
    } as const),
    setStudentsOnPosition: (studentOnPosition: Array<StudentType>) => ({
        type: 'SET_STUDENTS_ON_POSITION',
        studentOnPosition: studentOnPosition
    } as const),
    setIsStudentAppliedAnApplication: (isApplied: boolean) => ({
        type: 'SET_IS_STUDENT_APPLIED_AN_APPLICATION',
        isApplied
    } as const),
    setUpdatedPositionInfo: (newInfoAboutPosition: PositionType) => ({
        type: 'SET_UPDATED_POSITION_INFO',
        newInfoAboutPosition: newInfoAboutPosition
    } as const),
}

export const getPositionInfo = (positionId: string | null) => (dispatch: any) => {
    dispatch(positionReducerActions.setPositionInfoIsFetching(true))
    companyAPI.getIntershipPositionInfo(positionId)
        .then(data => {
            dispatch(positionReducerActions.setPositionInfo(data))
            dispatch(positionReducerActions.setPositionInfoIsFetching(false))
        })
}

export const deletePosition = (positionId: string) => (dispatch: any) => {
    companyAPI.deleteIntershipPosition(positionId)
        .then(responseStatus => {
            if (responseStatus === ResultCodesEnum.OK) {
            }
        })
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof positionReducerActions>

export default positionReducer;