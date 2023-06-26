import type {InferActionsTypes} from '../store';
import type {PracticePeriodAndStudentPracticeProfile} from '../../Types/types';
import { practiceServiceAPI } from 'API/practice-service-api';

let initialState = {
    practicePeriodsAndStudentPracticeProfiles: [] as Array<PracticePeriodAndStudentPracticeProfile>,
    isDataFetching: false as boolean
}

const practiceProfilesReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET_PRACTICE_PERIODS':
            return {
                ...state,
                practicePeriodsAndStudentPracticeProfiles : action.practicePeriodsAndStudentProfiles
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

export const practiceProfilesReducerActions = {
    setPracticePeriods: (practicePeriodsAndStudentProfiles: Array<PracticePeriodAndStudentPracticeProfile>) => (
        {
            type: 'SET_PRACTICE_PERIODS', 
            practicePeriodsAndStudentProfiles
        } as const),
    setIsDataFetching: (isFetching: boolean) => (
        {
            type: 'SET_IS_DATA_FETCHING', 
            isFetching
        } as const)
}

export const getAllStudentPracticePeriods = (studentId: string) => (dispatch: any) => {
    dispatch(practiceProfilesReducerActions.setIsDataFetching(true))
    practiceServiceAPI.getPracticePeriodAndStudentPracticeProfile(studentId)
        .then(data => {
            dispatch(practiceProfilesReducerActions.setPracticePeriods(data.profilesAndPeriodsNames))
            dispatch(practiceProfilesReducerActions.setIsDataFetching(false))
        })
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof practiceProfilesReducerActions>

export default practiceProfilesReducer;