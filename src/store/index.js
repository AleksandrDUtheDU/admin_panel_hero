import { createStore, combineReducers, compose } from 'redux';
//import reducer from '../reducers';
import heroes from '../reducers/heroes';
import filteres from '../reducers/filteres';

const enhanser = (createStore) => (...args) => { // мы как бы в ручную прописываем условие и переписываем строку в объект если приходит строка
    const store = createStore(...args);

    const oldDispath = store.dispatch;
    store.dispatch = (action) => {
        if (typeof action === 'string') {
            return oldDispath({
                type: action
            })
        }
        return oldDispath(action)
    }
    return store;
}

const store = createStore(
    combineReducers({ heroes, filteres }), // комбинируем 2 редьюсера
    compose( // комбинируем 2 функции (или усилителей стора)// ВАЖНО УЧИТЫВАТЬ ПОСЛЕДОВАТЕЛЬНОСТЬ
        enhanser,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;