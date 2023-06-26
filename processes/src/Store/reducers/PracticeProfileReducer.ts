import type {InferActionsTypes} from '../store';
import type {StudentType, PracticePeriod, CompanyInfoType} from '../../Types/types';
import { practiceServiceAPI } from 'API/practice-service-api';
import { companyAPI } from 'API/company-api';

let initialState = {
    studentPracticeProfile: {
        practiceProfileId: '' as string,
        student: {} as StudentType,
        practicePeriodInfo: {} as PracticePeriod,
        companyInfo: {} as CompanyInfoType,
        position: '' as string | null,
        characteristic: '' as string | null,
        practiceDiary: '' as string | null,
        practiceOrder: '' as string | null
    },
    isDataFetching: false as boolean
}

const PracticeProfileReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET_PRACTICE_PROFILE_ID':
            return {
                ...state,
                studentPracticeProfile : {
                    ...state.studentPracticeProfile,
                    practiceProfileId: action.practiceProfileId
                }
            };
        case 'SET_STUDENT_INFO':
            return {
                ...state,
                studentPracticeProfile : {
                    ...state.studentPracticeProfile,
                    student: action.student
                }
            };
        case 'SET_PRACTICE_PERIOD_INFO':
            return {
                ...state,
                studentPracticeProfile : {
                    ...state.studentPracticeProfile,
                    practicePeriodInfo: action.practicePeriod
                }
            };
        case 'SET_COMPANY_INFO':
            return {
                ...state,
                studentPracticeProfile : {
                    ...state.studentPracticeProfile,
                    companyInfo: action.company
                }
            };
        case 'SET_POSITION':
            return {
                ...state,
                studentPracticeProfile : {
                    ...state.studentPracticeProfile,
                    position: action.position
                }
            };
        case 'SET_CHARACTERISTIC':
            return {
                ...state,
                studentPracticeProfile : {
                    ...state.studentPracticeProfile,
                    characteristic: action.characteristic
                }
            };
        case 'SET_PRACTICE_DIARY':
            return {
                ...state,
                studentPracticeProfile : {
                    ...state.studentPracticeProfile,
                    practiceDiary: action.practiceDiary
                }
            };
        case 'SET_PRACTICE_ORDER':
            return {
                ...state,
                studentPracticeProfile : {
                    ...state.studentPracticeProfile,
                    practiceOrder: action.practiceOrder
                }
            };
        case 'SET_IS_DATA_FETCHING':
            return {
                ...state,
                isDataFetching : action.isFetching
            };
        default:
            return state;
    }
}

export const practiceProfileReducerActions = {
    setPracticeProfileId: (practiceProfileId: string) => (
        {
            type: 'SET_PRACTICE_PROFILE_ID', 
            practiceProfileId
        } as const),
    setStudentInfo: (student: StudentType) => (
        {
            type: 'SET_STUDENT_INFO', 
            student
        } as const),
    setpracticePeriodInfo: (practicePeriod: PracticePeriod) => (
        {
            type: 'SET_PRACTICE_PERIOD_INFO', 
            practicePeriod
        } as const),
    setCompanyInfo: (company: CompanyInfoType) => (
        {
            type: 'SET_COMPANY_INFO', 
            company
        } as const),
    setPosition: (position: string | null) => (
        {
            type: 'SET_POSITION', 
            position
        } as const),
    setCharacteristic: (characteristic: string | null) => (
        {
            type: 'SET_CHARACTERISTIC', 
            characteristic
        } as const),
    setPracticeDiary: (practiceDiary: string | null) => (
        {
            type: 'SET_PRACTICE_DIARY', 
            practiceDiary
        } as const),
    setPracticeOrder: (practiceOrder: string | null) => (
        {
            type: 'SET_PRACTICE_ORDER', 
            practiceOrder
        } as const),
    setIsDataFetching: (isFetching: boolean) => (
        {
            type: 'SET_IS_DATA_FETCHING', 
            isFetching
        } as const)
}

export const getStudentPracticeProfileInfo = (practiceProfileId: string) => (dispatch: any, getState: any) => {
    dispatch(practiceProfileReducerActions.setIsDataFetching(true))
    dispatch(practiceProfileReducerActions.setStudentInfo(getState().auth.user))
    practiceServiceAPI.getPracticeProfileInfo(practiceProfileId)
        .then((data) => {
            dispatch(practiceProfileReducerActions.setPracticeProfileId(data.practiceProfileId))
            dispatch(practiceProfileReducerActions.setPosition(data.position))
            dispatch(practiceProfileReducerActions.setCharacteristic(data.characteristic))
            dispatch(practiceProfileReducerActions.setPracticeDiary(data.practiceDiary))
            dispatch(practiceProfileReducerActions.setPracticeOrder(data.practiceOrder))
            return data
        })
        .then((data) => {
            practiceServiceAPI.getPracticePeriodInfo(data.practicePeriodId)
                .then((practicePeriodInfo) => {
                    dispatch(practiceProfileReducerActions.setpracticePeriodInfo(practicePeriodInfo))
                })
            return data
        })
        .then((data) => {
            companyAPI.getCompany(data.companyId)
            .then((companyInfo) => {
                dispatch(practiceProfileReducerActions.setCompanyInfo(companyInfo))
            })
            .then(() => {
                dispatch(practiceProfileReducerActions.setIsDataFetching(false))
            })
        })
}

export const editStudentPracticeProfileInfo = (practiceProfileId: string, practiceDiary: string | null) => 
    (dispatch: any, getState: any) => {
        let currentInfo = getState().practiceProfile.studentPracticeProfile
        dispatch(practiceProfileReducerActions.setIsDataFetching(true))

        practiceServiceAPI.editPracticeProfile(practiceProfileId, 
            currentInfo.position, currentInfo.characteristic, practiceDiary)
            .then(data => {
                dispatch(practiceProfileReducerActions.setPracticeDiary(data.practiceDiary))
                dispatch(practiceProfileReducerActions.setIsDataFetching(false))
            })
    
}

export type InitialStateType = typeof initialState
export type StudentPracticeProfileType = typeof initialState.studentPracticeProfile
type ActionsType = InferActionsTypes<typeof practiceProfileReducerActions>

export default PracticeProfileReducer;