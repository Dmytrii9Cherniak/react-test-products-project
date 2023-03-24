import { applyMiddleware, createStore } from 'redux';
import { rootReducer } from './all_reducers';
import thunk from 'redux-thunk';


export const store = createStore(rootReducer, applyMiddleware(thunk));
