import HeroesList from '../heroesList/HeroesList';
import HeroesFilters from '../heroesFilters/HeroesFilters';
import HeroesAddFormFormik from '../heroesAddForm/HeroesAddForm2';

import './app.scss';

const App = () => {

    return (
        <main className="app">
            <div className="content">
                <HeroesList />
                <div className="content__interactive">
                    <HeroesAddFormFormik />
                    <HeroesFilters />
                </div>
            </div>
        </main>
    )
}

export default App;