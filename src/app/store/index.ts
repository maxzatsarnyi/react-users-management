import thunk from 'redux-thunk';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { usersReducer } from './reducers/users';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['users'],
};

// type Reducer<S, A extends AnyAction> = (state: S, action: A) => S;
const rootReducer = combineReducers({
  users: usersReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [thunk];

const store = createStore(
  persistedReducer,
  compose(composeWithDevTools(applyMiddleware(...middlewares)))
);

const persistor = persistStore(store);

export { store, persistor };

export type RootState = ReturnType<typeof store.getState>;
