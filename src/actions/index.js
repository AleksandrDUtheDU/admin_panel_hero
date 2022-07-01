//import { createAction } from "@reduxjs/toolkit";
import {
    heroesFetching,
    heroesFetched,
    heroesFetchingError
} from '../components/heroesList/heroesSlice';
import {
    filtersFetching,
    filtersFetched,
    filtersFetchingError
} from '../components/heroesFilters/filtersSlice';


export const fetchHeroes = (request) => (dispatch) => {
    dispatch(heroesFetching());
    request("http://localhost:3001/heroes")
        .then(data => dispatch(heroesFetched(data)))
        .catch(() => dispatch(heroesFetchingError()))
}

export const fetchFilters = (request) => (dispatch) => {
    dispatch(filtersFetching());
    request("http://localhost:3001/filters")
        .then(data => dispatch(filtersFetched(data)))
        .catch(() => dispatch(filtersFetchingError()))
}

//export const heroesFetching = createAction('HEROES_FETCHING')

// export const heroesFetching = () => {
//     return {
//         type: 'HEROES_FETCHING'
//     }
// }

//export const heroesFetched = createAction('HEROES_FETCHED') // аргумент автоматом попадает в payload

// export const heroesFetched = (heroes) => {
//     return {
//         type: 'HEROES_FETCHED',
//         payload: heroes
//     }
// }

//export const heroesFetchingError = createAction('HEROES_FETCHING_ERROR')

// export const heroesFetchingError = () => {
//     return {
//         type: 'HEROES_FETCHING_ERROR'
//     }
// }

// export const filtersFetching = () => {
//     return {
//         type: 'FILTERS_FETCHING'
//     }
// }
// export const filtersFetched = (filters) => {
//     return {
//         type: 'FILTERS_FETCHED',
//         payload: filters
//     }
// }
// export const filtersFetchingError = () => {
//     return {
//         type: 'FILTERS_FETCHING_ERROR'
//     }
// }
// export const activeFilterChanged = (filter) => {
//     return {
//         type: 'FILTERS_ELEMENT_CHANGE',
//         payload: filter
//     }
// }

// export const activeFilterChanged = (filter) => (dispatch) => {
//     setTimeout(() => {
//         dispatch({
//             type: 'FILTERS_ELEMENT_CHANGE',
//             payload: filter
//         })
//     }, 1000)
// } // будет фильтроваться с задержкой времени

//export const heroCreated = createAction('HEROES_CREATED')

// export const heroCreated = (hero) => { // добавление героя в стор
//     return {
//         type: 'HEROES_CREATED',
//         payload: hero
//     }
// }

//export const heroDeleted = createAction('HEROES_DELETED')

// export const heroDeleted = (id) => { // удаление героя из стора
//     return {
//         type: 'HEROES_DELETED',
//         payload: id
//     }
// }