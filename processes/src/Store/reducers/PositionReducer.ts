import type {InferActionsTypes} from '../store';
import type {PositionType, StudentType} from '../../Types/types';

let initialState = {
    positionInfo: {
        id: '1',
        name: 'IOS-разработчик',
        description: 'Описание',
        skills: 'Навыки',
        places: 1,
        companyName: 'red_mad_robot',
        applicationsNumber: 2
    } as PositionType,
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
    setPositionInfo: (positionInfo: PositionType) => ({
        type: 'SET_POSITION_INFO',
        positionInfo: positionInfo
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
    } as const)
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof positionReducerActions>

export default positionReducer;