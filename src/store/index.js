import { createStore, combineReducers } from 'redux';
//import reducer from '../reducers';
import heroes from '../reducers/heroes';
import filteres from '../reducers/filteres';

const store = createStore(
    combineReducers({ heroes, filteres }), // комбинируем 2 редьюсера
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;