import { v4 as uuidv4 } from 'uuid';
import { useHttp } from '../../hooks/http.hook';
import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { heroCreated, filtersFetching, filtersFetched, filtersFetchingError } from '../../actions';

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

// fetch('server.php', { //отправляем POST запрос
//     method: "POST",
//     headers: {
//         'Content-type': 'application/json' //заголовок
//     },
//     body: JSON.stringify(object)
// })

const HeroesAddFormFormik = () => {

    const { filters, filtersLoadingStatus } = useSelector(state => state)


    const [heroName, setHeroName] = useState('');
    const [heroDescr, setHeroDescr] = useState('');
    const [heroElement, setHeroElement] = useState('');

    const { request } = useHttp();

    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(filtersFetching());
    //     request("http://localhost:3001/heroes")
    //         .then(data => dispatch(filtersFetched(data)))
    //         .catch(() => dispatch(filtersFetchingError()))
    // }, [request]);


    const onSubmitHandler = (e) => {
        e.preventDefault();
        const newHero = {
            id: uuidv4(),
            name: heroName,
            description: heroDescr,
            element: heroElement
        }

        request("http://localhost:3001/heroes", "POST", JSON.stringify(newHero))
            .then(res => console.log(res, 'Отправка успешна'))
            .then(dispatch(heroCreated(newHero)))
            .catch(err => console.log(err));

        setHeroName('');
        setHeroDescr('');
        setHeroElement('');

    }

    const renderFilters = (filters, status) => {
        if (status === "loading") {
            return <option>Загрузка элементов</option>
        } else if (status === "error") {
            return <option>Ошибка загрузки</option>
        }

        // Если фильтры есть, то рендерим их
        if (filters && filters.length > 0) {
            return filters.map(({ id, element, title }) => {
                // Один из фильтров нам тут не нужен
                // eslint-disable-next-line
                if (element === 'all') return;

                return <option key={id} value={element}>{title}</option>
            })
        }
    }
    const option = renderFilters(filters, filtersLoadingStatus);



    return (
        <form
            className="border p-4 shadow-lg rounded"
            onSubmit={onSubmitHandler}
        >
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input
                    required
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    placeholder="Как меня зовут?"
                    value={heroName}
                    onChange={(e) => setHeroName(e.target.value)}
                />

            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="description"
                    type="text"
                    className="form-control"
                    id="text"
                    placeholder="Что я умею?"
                    style={{ "height": '130px' }}
                    value={heroDescr}
                    onChange={(e) => setHeroDescr(e.target.value)}


                />
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select
                    required
                    className="form-select"
                    id="element"
                    name="element"
                    value={heroElement}
                    onChange={(e) => setHeroElement(e.target.value)}


                >
                    <option >Я владею элементом...</option>
                    {/* <option value="fire">Огонь</option>
                    <option value="water">Вода</option>
                    <option value="wind">Ветер</option>
                    <option value="earth">Земля</option> */}
                    {option}
                </select>
            </div>


            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddFormFormik;