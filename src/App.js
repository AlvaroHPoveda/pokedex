import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import NameForm from './pages/NameForm';
import Pokedex from './pages/Pokedex';
import PokedexDetail from './pages/PokedexDetail';
import ProtectedRoutes from './component/ProtectedRoutes';

function App() {
  return (
      <HashRouter>
        <div className='animation'></div>
        <Routes>
          <Route path="/" element={<NameForm/>}/>
          <Route element={<ProtectedRoutes/>}>
            <Route path="/pokedex" element={<Pokedex/>}/>
            <Route path="/pokedex/:name" element={<PokedexDetail/>}/>
          </Route>
        </Routes>
      </HashRouter>
  );
}

export default App;
