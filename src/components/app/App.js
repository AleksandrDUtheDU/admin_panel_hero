import HeroesList from '../heroesList/HeroesList';
import HeroesFilters from '../heroesFilters/HeroesFilters';
import HeroesAddForm from '../heroesAddForm/HeroesAddForm';

import './app.scss';

const App = () => {

    return (
        <main className="app">
            <div className="content">
                <HeroesList />
                <div className="content__interactive">
                    <HeroesAddForm />
                    <HeroesFilters />
                </div>
            </div>
        </main>
    )
}

export default App;