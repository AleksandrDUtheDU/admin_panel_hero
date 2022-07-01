// //import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
// //import ReduxThunk from 'redux-thunk';
// //import reducer from '../reducers';
import { configureStore } from '@reduxjs/toolkit';// //import heroes from '../reducers/heroes';
import heroes from '../components/heroesList/heroesSlice';
import filters from '../components/heroesFilters/filtersSlice';
// //import filteres from '../reducers/filteres';


const stringMiddleware = () => (next) => (action) => {
    if (typeof action === 'string') {
        return next({
            type: action
        })
    }
    return next(action)
};

// // const enhanser = (createStore) => (...args) => { // мы как бы в ручную прописываем условие и переписываем строку в объект если приходит строка
// //     const store = createStore(...args);

// //     const oldDispath = store.dispatch;
// //     store.dispatch = (action) => {
// //         if (typeof action === 'string') {
// //             return oldDispath({
// //                 type: action
// //             })
// //         }
// //         return oldDispath(action)
// //     }
// //     return store;
// // }

// // const store = createStore(
// //     combineReducers({ heroes, filteres }), // комбинируем 2 редьюсера
// //     compose(
// //         applyMiddleware(ReduxThunk, stringMiddleware),
// //         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// //     )
// //     // compose( // комбинируем 2 функции (или усилителей стора)// ВАЖНО УЧИТЫВАТЬ ПОСЛЕДОВАТЕЛЬНОСТЬ
// //     //     enhanser,
// //     //     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// //     //)
// // );

const store = configureStore({
    reducer: { heroes, filters },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
})

export default store;