
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import classNames from 'classnames';

import { useHttp } from '../../hooks/http.hook';
import { filtersFetching, filtersFetched, filtersFetchingError, activeFilterChanged } from '../../actions';
import Spinner from '../spinner/Spinner';



// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {

    const { filters, filtersLoadingStatus, activeFilter } = useSelector(state => state.filteres)

    const { request } = useHttp();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(filtersFetching());
        request("http://localhost:3001/filters")
            .then(data => dispatch(filtersFetched(data)))
            .then(data => console.log(data.payload))
            .catch(() => dispatch(filtersFetchingError()))
    }, []);

    console.log(filters)

    if (filtersLoadingStatus === "loading") {
        return <Spinner />;
    } else if (filtersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderFiltersList = (arr) => {
        if (arr.lenght === 0) {
            return <h5 className="text-center mt-5">Фильтров нет</h5>
        }

        return arr.map(item => {
            const btnClass = classNames('btn', item.class, {
                'active': item.element === activeFilter
            });

            return <button
                className={btnClass}
                key={item.id}
                id={item.element}
                onClick={() => dispatch(activeFilterChanged(item.element))}
            >
                {item.title}</button>
        })
    }

    const button = renderFiltersList(filters);

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {/* <button className="btn btn-outline-dark active">Все</button> */}
                    {button}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;