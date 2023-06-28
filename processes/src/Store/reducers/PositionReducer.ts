import type {InferActionsTypes} from '../store';
import type {PositionType, 
    StudentType, 
    IntershipPositionType, 
    IntersipPositionCreationType, 
    UserDtoType,
    ApplicationDtoType} from '../../Types/types';
import { companyAPI } from 'API/company-api';
import { ResultCodesEnum } from 'API/api';
import { applicationServiceAPI } from 'API/application-service-api';

let initialState = {
    positionInfo: {} as IntershipPositionType,
    positionInfoIsFetching: true as boolean,
    studentsOnPosition: [] as Array<UserDtoType>,
    studentsOnPositionIsFetching: false as boolean,
    isStudentAppliedAnApplication: true,
    updatedPositionInfo: {
        companyId: null,
        intershipPositionName: '',
        intershipPositionDescription: '',
        intershipPositionskills: '',
        intershipPositionCount: '' 
    } as IntersipPositionCreationType
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
        case 'SET_STUDENTS_ON_POSITION_IS_FETCHING':
            return {
                 ...state,
                 studentsOnPositionIsFetching: action.isFetching
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
        case 'CLEAR_UPDATED_POSITION_INFO':
            return {
                ...state,
                updatedPositionInfo : {
                    companyId: null,
                    intershipPositionName: '',
                    intershipPositionDescription: '',
                    intershipPositionskills: '',
                    intershipPositionCount: ''
                }
            }
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
    setStudentsOnPosition: (studentOnPosition: Array<UserDtoType>) => ({
        type: 'SET_STUDENTS_ON_POSITION',
        studentOnPosition: studentOnPosition
    } as const),
    setStudentsOnPositionIsFetching: (isFetching: boolean) => ({
        type: 'SET_STUDENTS_ON_POSITION_IS_FETCHING',
        isFetching
    } as const),
    setIsStudentAppliedAnApplication: (isApplied: boolean) => ({
        type: 'SET_IS_STUDENT_APPLIED_AN_APPLICATION',
        isApplied
    } as const),
    setUpdatedPositionInfo: (newInfoAboutPosition: IntersipPositionCreationType) => ({
        type: 'SET_UPDATED_POSITION_INFO',
        newInfoAboutPosition: newInfoAboutPosition
    } as const),
    clearUpdatedPositionInfo: () => ({
        type: 'CLEAR_UPDATED_POSITION_INFO'
    } as const),
}

export const getPositionInfo = (positionId: string) => (dispatch: any) => {
    dispatch(positionReducerActions.setPositionInfoIsFetching(true))
    dispatch(positionReducerActions.setIsStudentAppliedAnApplication(false))
    companyAPI.getIntershipPositionInfo(positionId)
        .then(data => {
            dispatch(positionReducerActions.setPositionInfo(data))
            return data
        })
        .then(data => {
            dispatch(positionReducerActions.setUpdatedPositionInfo({
                companyId: data.companyId,
                intershipPositionName: data.intershipPositionName,
                intershipPositionDescription: data.intershipPositionDescription,
                intershipPositionskills: '',
                intershipPositionCount: data.intershipPositionCount
            }))
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

export const updatePositionInfo = (positionId: string) => (dispatch: any, getState: any) => {
    const updatedPosition = getState().position.updatedPositionInfo
    companyAPI.putIntershipPosition(
        positionId, updatedPosition.companyId, updatedPosition.intershipPositionName,
        updatedPosition.intershipPositionDescription ,updatedPosition.intershipPositionCount)
        .then(() => {
            dispatch(positionReducerActions.clearUpdatedPositionInfo())
            dispatch(positionReducerActions.setPositionInfoIsFetching(true))
            companyAPI.getIntershipPositionInfo(positionId)
                .then(data => {
                    dispatch(positionReducerActions.setPositionInfo(data))
                    return data
                })
                .then(data => {
                    dispatch(positionReducerActions.setUpdatedPositionInfo({
                        companyId: data.companyId,
                        intershipPositionName: data.intershipPositionName,
                        intershipPositionDescription: data.intershipPositionDescription,
                        intershipPositionskills: '',
                        intershipPositionCount: data.intershipPositionCount
                    }))
                    dispatch(positionReducerActions.setPositionInfoIsFetching(false))
                })
        })
}

export const getStudentsFromPositionApplications = (positionId: string) => (dispatch: any) => {
    dispatch(positionReducerActions.setStudentsOnPositionIsFetching(true))
    dispatch(positionReducerActions.setStudentsOnPositionIsFetching(false))
}

export const findOutIsStudentAppliedAnApplication = (positionId: string) => (dispatch: any, getState: any) => {
    const studentId = getState().auth.user.userId
    let isApplied = false
    applicationServiceAPI.getAllApplicationsByPositionId(positionId)
        .then(applications => {
            let filteredApplications = applications.filter((application: ApplicationDtoType) => application.studentId === studentId)
            isApplied = filteredApplications.length === 0 ? false : true
            dispatch(positionReducerActions.setIsStudentAppliedAnApplication(isApplied))
        })
}

export const createApplicationForPosition = (positionId: string) => (dispatch: any) => {
    applicationServiceAPI.createApplication(positionId)
        .then(response => {
            if(response.status === ResultCodesEnum.OK) {
                dispatch(positionReducerActions.setIsStudentAppliedAnApplication(true))
            }
        })
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof positionReducerActions>

export default positionReducer;