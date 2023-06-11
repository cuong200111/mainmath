import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "@redux-saga/core";
import rootReducer from "./reducer";
import rootSaga from "./saga";
const sagaMiddleware = createSagaMiddleware()
const root = combineReducers({
    dataGlobal: rootReducer
})
const store = createStore(
    root,
    applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(rootSaga)
export default store