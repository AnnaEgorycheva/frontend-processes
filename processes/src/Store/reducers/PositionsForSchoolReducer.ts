import type {InferActionsTypes} from '../store';

type PositionType = {
    id: number
    name: string
    description: string
    places: number
    companyName: string
}

let initialState = {
    positions: [
        {
            id: 1, 
            name: 'Front-end разработчик',
            description: 'Какое-то описание',
            places: 4,
            companyName: 'НТР'
        },
        {
            id: 2, 
            name: 'IOS разработчик',
            description: 'Какое-то описание',
            places: 1,
            companyName: 'red_mad_robot'
        },
        {
            id: 1, 
            name: 'IOS разработчик',
            description: 'Какое-то описание',
            places: 1,
            companyName: 'Спортмастер'
        },
        {
            id: 1, 
            name: 'Аналитик',
            description: 'Какое-то описание',
            places: 3,
            companyName: 'Спортмастер'
        },
    ] as Array<PositionType>
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>

const positionsForSchoolReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET_POSITIONS':
            return {
                ...state,
                positions : action.positions
            };
        default:
            return state;
    }
}

export const actions = {
    setPositions: (positions: Array<PositionType>) => (
        {
            type: 'SET_POSITIONS', 
            positions
        } as const)
}

export default positionsForSchoolReducer;
