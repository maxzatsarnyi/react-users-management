import thunk from 'redux-thunk';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { usersReducer } from './reducers/users';
const rootReducer = combineReducers({
  users: usersReducer,
});

const middlewares = [thunk];

const store = createStore(
  rootReducer,
  compose(composeWithDevTools(applyMiddleware(...middlewares)))
);

export { store };

export type RootState = ReturnType<typeof store.getState>;
