import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import { reducer as reduxFormReducer } from 'redux-form';
import userReducer from './reducers/user';
import apiReducer from './reducers/api-response';
import { setToken } from './actions/user';
import CONFIG from './config';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers({
        form: reduxFormReducer,
        api: apiReducer,
        user: userReducer,
    }),
    composeEnhancers(applyMiddleware(thunk)),
);

const token = localStorage.getItem(CONFIG.STORAGE.TOKEN);
if (token) {
    store.dispatch(setToken(token));
}

export default store;