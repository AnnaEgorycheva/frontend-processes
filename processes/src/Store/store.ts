import {legacy_createStore as createStore, applyMiddleware, combineReducers, compose} from "redux";
import thunkMiddleware from "redux-thunk";
import positionsReducer from "./reducers/PositionsReducer";
import creatingNewPositionReducer from "./reducers/CreatingNewPositionReducer";
import positionReducer from "./reducers/PositionReducer";

let rootReducer = combineReducers({
    positions : positionsReducer,
    creatingNewPosition : creatingNewPositionReducer,
    position: positionReducer
})

type RootReducerType = typeof rootReducer; 
export type AppStateType = ReturnType<RootReducerType>

export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))
// @ts-ignore
window.__store__ = store

export default store