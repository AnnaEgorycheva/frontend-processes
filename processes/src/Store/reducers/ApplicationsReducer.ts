import type {InferActionsTypes} from '../store';
import type {ApplicationType} from '../../Types/types'

let initialState = {
    applications: [
        {
            applicationId: '1',
            positionName: 'Аналитик',
            companyName : 'Спортмастер Лаб',
            status: 'Заявка подана',
            user: {
                id: '1',
                lastName: 'Иванов',
                patronym: 'Иванович',
                firstName: 'Иван'
            }
        },
        {
            applicationId: '2',
            positionName: 'Frontend-разработчик',
            companyName : 'Спортмастер Лаб',
            status: 'Заявка подана',
            user: {
                id: '2',
                lastName: 'Петров',
                patronym: 'Петрович',
                firstName: 'Петр'
            }
        },
        {
            applicationId: '3',
            positionName: 'Frontend-разработчик',
            companyName : 'НТР',
            status: 'Заявка подана',
            user: {
                id: '2',
                lastName: 'Петров',
                patronym: 'Петрович',
                firstName: 'Петр'
            }
        }
    ] as Array<ApplicationType>
}

const applicationsReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET_APPLICATIONS':
            return {
                ...state,
                applications: action.payload
            };
        default:
            return state;
    }
}

export const applicationsReducerActions = {
    setApplications: (applications: Array<ApplicationType>) => (
        {
            type: 'SET_APPLICATIONS', 
            payload: applications
        } as const)
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof applicationsReducerActions>

export default applicationsReducer;
