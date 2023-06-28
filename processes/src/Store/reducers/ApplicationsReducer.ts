import type {InferActionsTypes} from '../store';
import type {ApplicationDtoType} from '../../Types/types'
import { applicationServiceAPI } from 'API/application-service-api';
import { companyAPI } from 'API/company-api';

let initialState = {
    applications: [] as Array<ApplicationDtoType>,
    isApplicationsFetching: false as boolean
}

const applicationsReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET_APPLICATIONS':
            return {
                ...state,
                applications: action.payload
            };
        case 'SET_IS_APPLICATIONS_FETCHING':
            return {
                ...state,
                isApplicationsFetching: action.isFetching
            };
        default:
            return state;
    }
}

export const applicationsReducerActions = {
    setApplications: (applications: Array<ApplicationDtoType>) => (
        {
            type: 'SET_APPLICATIONS', 
            payload: applications
        } as const),
    setIsApplicationsFetching: (isFetching: boolean) => (
        {
            type: 'SET_IS_APPLICATIONS_FETCHING', 
            isFetching
        } as const)
}

const connectApplicationPositionAndCompany = async (applications: Array<ApplicationDtoType>) => {
    await Promise.all(applications.map(application => {
        return companyAPI.getIntershipPositionInfo(application.positionId)
            .then((intershipPositionInfo => {
                application.companyName = intershipPositionInfo.companyName
                application.intershipPositionName = intershipPositionInfo.intershipPositionName
            }))
    }))

    return applications;
}
export const getStudentApplications = () => (dispatch: any, getState: any) => {
    dispatch(applicationsReducerActions.setIsApplicationsFetching(true))
    const studentId = getState().auth.user.userId
    applicationServiceAPI.getStudentApplicationsById(studentId)
        .then(data => {
            connectApplicationPositionAndCompany(data.applications)
                .then((applicationsWithCompanyName => {
                    dispatch(applicationsReducerActions.setApplications(applicationsWithCompanyName))
                    dispatch(applicationsReducerActions.setIsApplicationsFetching(false))
                }))
            
        })
}

export const getCompanyApplications = () => (dispatch: any, getState: any) => {
    // dispatch(applicationsReducerActions.setIsApplicationsFetching(true))
    const companyId = getState().auth.user.userId
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof applicationsReducerActions>

export default applicationsReducer;
