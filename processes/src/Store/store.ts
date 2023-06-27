import {legacy_createStore as createStore, applyMiddleware, combineReducers, compose, Action} from "redux";
import thunkMiddleware, { ThunkAction } from "redux-thunk";
import positionsReducer from "./reducers/PositionsReducer";
import creatingNewPositionReducer from "./reducers/CreatingNewPositionReducer";
import positionReducer from "./reducers/PositionReducer";
import applicationsReducer from "./reducers/ApplicationsReducer";
import authReducer from "./reducers/AuthReducer";
import appReducer from "./reducers/AppReducer";
import practicePeriodsReducer from "./reducers/PracticePeriodsReducer";
import practiceProfilesReducer from "./reducers/PracticeProfilesReducer";
import PracticeProfileReducer from "./reducers/PracticeProfileReducer";
import PracticePeriodReducer from "./reducers/PracticePeriodReducer";

let rootReducer = combineReducers({
    positions : positionsReducer,
    creatingNewPosition : creatingNewPositionReducer,
    position: positionReducer,
    applications: applicationsReducer,
    auth: authReducer,
    app: appReducer,
    practicePeriods: practicePeriodsReducer,
    practiceProfiles: practiceProfilesReducer,
    practiceProfile: PracticeProfileReducer,
    practicePeriod: PracticePeriodReducer
})

type RootReducerType = typeof rootReducer; 

export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

export type AppStateType = ReturnType<RootReducerType>
export type AppDispatch = typeof store.dispatch

// @ts-ignore
window.__store__ = store

export default store