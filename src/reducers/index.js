const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    filtersLoadingStatus: 'idle',
    activeFilter: 'all'
    // filteredHeroes: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                // filteredHeroes: state.activeFilter === 'all' ? // переносим в компонент в useSelector что бы была возможность разделить селекторы
                //     action.payload :
                //     action.payload.filter(item => item.element === state.activeFilter),
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'FILTERS_FETCHING':
            return {
                ...state,
                filtersLoadingStatus: 'loading'
            }
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filters: action.payload,
                filtersLoadingStatus: 'idle'
            }
        case 'FILTERS_FETCHING_ERROR':
            return {
                ...state,
                filtersLoadingStatus: 'error'
            }
        case 'FILTERS_ELEMENT_CHANGE':
            return {
                ...state,
                activeFilter: action.payload,
                // filteredHeroes: action.payload === 'all' ?
                //     state.heroes :
                //     state.heroes.filter(item => item.element === action.payload)
            }

        case 'HEROES_CREATED':
            //let newListItemAdd = [...state.heroes, action.payload] //добавил героя пришкдшего из action
            return {
                ...state,
                heroes: [...state.heroes, action.payload]
                // filteredHeroes: state.activeFilter === 'all' ?
                //     newListItemAdd :
                //     newListItemAdd.filter(item => item.element === state.activeFilter)
            }
        case 'HEROES_DELETED':
            //let newListItemLose = state.heroes.filter(item => item.id !== action.payload) // отфильтровали массив убрали эллемент по id
            return {
                ...state,
                heroes: state.heroes.filter(item => item.id !== action.payload),
                // filteredHeroes: state.activeFilter === 'all' ?
                //     newListItemLose :
                //     newListItemLose.filter(item => item.element === state.activeFilter)
            }
        default: return state
    }
}

export default reducer;