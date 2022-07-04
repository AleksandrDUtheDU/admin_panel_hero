import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from "@reduxjs/toolkit";

import { useHttp } from '../../hooks/http.hook';

const heroesAdapter = createEntityAdapter(); //вернет спецефич объект 

// const initialState = {
//     heroes: [],
//     heroesLoadingStatus: 'idle'
// }

const initialState = heroesAdapter.getInitialState({
    heroesLoadingStatus: 'idle'
}) //генерируем новое нач состояние

//console.log(initialState);
// {ids: Array(0), entities: {…}}
// entities: {}
//heroesLoadingStatus: "idle"
// ids: []
// [[Prototype]]: Object

export const fetchHeroes = createAsyncThunk( // возвращает pending fulfilled rejected
    'heroes/fetchHeroes', // название/тип действия
    () => { // асинхронный код - должны получить промис
        const { request } = useHttp();
        return request("http://localhost:3001/heroes"); // async await уже в реквесте
    }
);

const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        // heroesFetching: state => { state.heroesLoadingStatus = 'loading' },
        // heroesFetched: (state, action) => {
        //     state.heroesLoadingStatus = 'idle';
        //     state.heroes = action.payload;
        // },
        // heroesFetchingError: state => {
        //     state.heroesLoadingStatus = 'error';
        // },
        heroCreated: (state, action) => {
            //state.heroes.push(action.payload);
            heroesAdapter.addOne(state, action.payload);
        },
        heroDeleted: (state, action) => {
            // state.heroes = state.heroes.filter(item => item.id !== action.payload);
            heroesAdapter.removeOne(state, action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeroes.pending, state => { state.heroesLoadingStatus = 'loading' })
            .addCase(fetchHeroes.fulfilled, (state, action) => {
                state.heroesLoadingStatus = 'idle';
                //state.heroes = action.payload;
                heroesAdapter.setAll(state, action.payload); // во время получения добавляем в стейт (с заменой)
            })
            .addCase(fetchHeroes.rejected, state => {
                state.heroesLoadingStatus = 'error';
            })
            .addDefaultCase(() => { })
    }
});



const { actions, reducer } = heroesSlice;

export default reducer;

const { selectAll } = heroesAdapter.getSelectors(state => state.heroes) // говорим о том что будем обращаться сразу к state.heroes методами

export const filteredHeroesSelector = createSelector(
    (state) => state.filters.activeFilter,
    //(state) => state.heroes.heroes,
    selectAll,
    (filter, heroes) => {
        if (filter === 'all') {
            return heroes;
        } else {
            return heroes.filter(item => item.element === filter);
        }
    }
);


export const {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroCreated,
    heroDeleted
} = actions;