import {
	Action,
	applyMiddleware,
	combineReducers,
	compose,
	legacy_createStore as createStore,
} from 'redux';

//Импорт reducers для создания stora стейтов
import profileReducer from './profileReducer';
import dialogsReducer from './dialogsReducer';
import usersReducer from './usersReducer';
import authReducer from './authReducer';
import thunkMiddleware, { ThunkAction } from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import appReducer from './app-reducer';
import chatReducer from './chat-reducer';

//соединение редьюсеров и страниц
let rootReducers = combineReducers({
	profilePage: profileReducer,
	dialogsPage: dialogsReducer,
	usersPage: usersReducer,
	auth: authReducer,
	form: formReducer,
	app: appReducer,
	chat: chatReducer,
});

//@ts-ignore   за этой строчкой будет игнорироваться тип
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// создания стора из пачки редьюсеров и оборот в мидлвейр чтобы можно было использовать санки
const store = createStore(
	rootReducers,
	composeEnhancers(applyMiddleware(thunkMiddleware))
);
// let store = createStore(reducers, applyMiddleware(thunkMiddleware));
export default store;

//Типы и типизация
type RootReducerType = typeof rootReducers; //определяет тип и на его основе делает тип
export type AppStateType = ReturnType<RootReducerType>; //весь стейт AppStateType
//AppStateType у тебя будет тип как у (ReturnType: возвращаемый тип ) RootReducerType
// let state: AppStateType
// state. и после точки увидим все редьюсеры допступные

//для диспатчей
export type AppDispatch = typeof store.dispatch;

//Дженерик
// type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never;
// export type InferActionsTypes<
// 	T extends { [key: string]: (...args: any[]) => any }
// > = ReturnType<PropertiesTypes<T>>;

//внизу более короткая запись
export type InferActionsTypes<T> = T extends {
	[key: string]: (...args: any[]) => infer U;
}
	? U
	: never;

//Типизация санок
//A - ActionsType, R - возвращаемое значение,
export type BaseThunkType<
	A extends Action = Action,
	R = Promise<void>
> = ThunkAction<R, AppStateType, unknown, A>;
