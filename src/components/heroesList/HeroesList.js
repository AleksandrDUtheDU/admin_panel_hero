import { useHttp } from '../../hooks/http.hook';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect'

import { heroesFetching, heroesFetched, heroesFetchingError, heroDeleted } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

const HeroesList = () => {

    const filterHeroesSelector = createSelector(  // синтаксис createSelector он мемонизирует и не будет рендерить при тригере на изменеие стейта если сам стейт не изменился
        (state) => state.filteres.activeFilter,
        (state) => state.heroes.heroes,
        (filter, heroes) => {
            if (filter === 'all') {
                console.log('render'); // рендерит при изменении глобального стейта (не смотря на одинаковые значения)
                return heroes;
            } else {
                return heroes.filter(item => item.element === filter)
            }
        }
    )

    // const someState = useSelector(state => ({
    //     activeFilter: state.filteres.activeFilter,
    //     heroes: state.heroes.heroes,
    // }))  // из за строго сравнения при сравнении объекта с объектом будет всегда не равен = как следствие перерендер во всех случаях

    const filteredHeroes = useSelector(filterHeroesSelector);

    // const filteredHeroes = useSelector(state => {
    //     if (state.filteres.activeFilter === 'all') {
    //         console.log('render'); // рендерит при изменении глобального стейта (не смотря на одинаковые значения)
    //         return state.heroes.heroes;
    //     } else {
    //         return state.heroes.heroes.filter(item => item.element === state.filteres.activeFilter)
    //     }
    // })

    const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus);
    const dispatch = useDispatch();
    const { request } = useHttp();

    useEffect(() => {
        dispatch("HEROES_FETCHING"); // по умолчанию dispatch всегда принимает объект //
        //dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))
    }, []);

    const onDelete = useCallback((id) => {
        request(`http://localhost:3001/heroes/${id}`, "DELETE")
            .then(data => console.log(data, 'Deleted'))
            .then(dispatch(heroDeleted(id)))
            .catch(err => console.log(err));
    }, [request]);


    if (heroesLoadingStatus === "loading") {
        return <Spinner />;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.lenght === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }
        return arr.map(({ id, ...props }) => {
            return <HeroesListItem
                key={id}
                onDelete={() => onDelete(id)}
                {...props}
            />
        })
    }

    const elements = renderHeroesList(filteredHeroes);

    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;