import HeroesList2 from '../heroesList/HeroesList2';
import HeroesFilters2 from '../heroesFilters/HeroesFilters2';
import HeroesAddFormFormik from '../heroesAddForm/HeroesAddForm3';

import './app.scss';

const App = () => {

    return (
        <main className="app">
            <div className="content">
                <HeroesList2 />
                <div className="content__interactive">
                    <HeroesAddFormFormik />
                    <HeroesFilters2 />
                </div>
            </div>
        </main>
    )
}

export default App;