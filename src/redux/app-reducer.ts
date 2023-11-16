import { getAuthUserData } from './authReducer.ts';
import { InferActionsTypes } from './redux-store.ts';

const INITIALIZED_SUCCESS = 'SN/APP/INITIALIZED_SUCCESS';

//1) тип для иниц стейта, 2) экшены в обьект, 3) типы для экшенов через generic

//иницилизация стейта
let initialState = {
	initialized: false,
};

//reducer
const appReducer = (
	state = initialState,
	action: ActionsType
): InitialStateType => {
	switch (action.type) {
		case INITIALIZED_SUCCESS:
			return {
				...state,
				initialized: true,
			};

		default:
			return state;
	}
};

//чтобы не создавить экшн типы для экшн креаторов, которые нам выплёвывают соотвествующие типы
//будет использоваться автовыведение типизации. const actions

//Action
export const actions = {
	initializedSuccess: () => ({
		type: INITIALIZED_SUCCESS,
	}),
};

// Санки
export const initializeApp = () => (dispatch: any) => {
	let promise = dispatch(getAuthUserData());

	promise.then(() => {
		dispatch(actions.initializedSuccess());
	});
};

export default appReducer;

//Типы

//определения типа как у иницилизации стейта
export type InitialStateType = typeof initialState;
//
type ActionsType = InferActionsTypes<typeof actions>;
