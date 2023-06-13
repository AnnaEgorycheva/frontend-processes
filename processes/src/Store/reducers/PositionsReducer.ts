import type {InferActionsTypes} from '../store';
import type {PositionType} from '../../Types/types';

let initialState = {
    positions: [
        {
            id: 1, 
            name: 'Front-end разработчик',
            description: 'Какое-то описание',
            places: 4,
            companyName: 'НТР',
            applicationsNumber: 10
        },
        {
            id: 2, 
            name: 'IOS разработчик',
            description: 'Какое-то описание',
            places: 1,
            companyName: 'red_mad_robot',
            applicationsNumber: 4
        },
        {
            id: 3, 
            name: 'IOS разработчик',
            description: 'Какое-то описание',
            places: 1,
            companyName: 'Спортмастер',
            applicationsNumber: 1
        },
        {
            id: 4, 
            name: 'Аналитик',
            description: 'Какое-то описание',
            places: 3,
            companyName: 'Спортмастер',
            applicationsNumber: 5
        },
    ] as Array<PositionType>
}

const positionsReducer = (state = initialState, action: ActionsType): InitialStateType => {
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

export const positionsReducerActions = {
    setPositions: (positions: Array<PositionType>) => (
        {
            type: 'SET_POSITIONS', 
            positions
        } as const)
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof positionsReducerActions>

export default positionsReducer;
