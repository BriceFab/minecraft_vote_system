import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import { reducer as reduxFormReducer } from 'redux-form';
import userReducer from './reducers/user';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers({
        form: reduxFormReducer,
        user: userReducer,
    }),
    composeEnhancers(applyMiddleware(thunk)),
);

// Hydrate the authToken from localStorage if it exist
// const loadedToken = loadToken();
// if (loadedToken) {
//     const token = loadedToken;
//     store.dispatch(setToken(token));
//     store.dispatch(refreshToken());
// }

export default store;