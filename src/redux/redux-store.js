import {
	combineReducers,
	legacy_createStore,
	legacy_createStore as createStore,
} from 'redux';

import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './profileReducer';
import dialogsReducer from './dialogsReducer';

let reducers = combineReducers({
	profilePage: profileReducer,
	dialogsPage: dialogsReducer,
});
let store = createStore(reducers);
export default store;
