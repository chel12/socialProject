import {
	applyMiddleware,
	combineReducers,
	compose,
	legacy_createStore as createStore,
} from 'redux';

import profileReducer from './profileReducer';
import dialogsReducer from './dialogsReducer';
import usersReducer from './usersReducer';
import authReducer from './authReducer';
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import appReducer from './app-reducer';

let rootReducers = combineReducers({
	profilePage: profileReducer,
	dialogsPage: dialogsReducer,
	usersPage: usersReducer,
	auth: authReducer,
	form: formReducer,
	app: appReducer,
});

type RootReducerType = typeof rootReducers; //определяет тип и на его основе делает тип
export type AppStateType = ReturnType<RootReducerType>; //весь стейт AppStateType
//AppStateType у тебя будет тип как у (ReturnType: возвращаемый тип ) RootReducerType
// let state: AppStateType
// state. и после точки увидим все редьюсеры допступные
//@ts-ignore   за этой строчкой будет игнорироваться тип
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
	rootReducers,
	composeEnhancers(applyMiddleware(thunkMiddleware))
);
// let store = createStore(reducers, applyMiddleware(thunkMiddleware));
export default store;
