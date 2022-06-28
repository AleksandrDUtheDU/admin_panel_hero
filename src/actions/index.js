export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}
export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}
export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}
export const filtersFetching = () => {
    console.log('пизда')
    return {
        type: 'FILTERS_FETCHING'
    }
}
export const filtersFetched = (filters) => {
    return {
        type: 'FILTERS_FETCHED',
        payload: filters
    }
}
export const filtersFetchingError = () => {
    return {
        type: 'FILTERS_FETCHING_ERROR'
    }
}
export const activeFilterChanged = (filter) => {
    return {
        type: 'FILTERS_ELEMENT_CHANGE',
        payload: filter
    }
}


export const heroCreated = (hero) => { // добавление героя в стор
    return {
        type: 'HEROES_CREATED',
        payload: hero
    }
}

export const heroDeleted = (id) => { // удаление героя из стора
    return {
        type: 'HEROES_DELETED',
        payload: id
    }
}