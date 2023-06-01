import Collection from './component/collection';
import Cards from './component/cards';
import Menu from './componentFixe/menus';
import CardsDetailed from './component/CardsDetailed';
import { Route, Routes } from 'react-router-dom';


const App = () => {
  return (
    <div className="App">
      <Menu />
      <Routes>
        <Route path="/" element={<Collection />} />
        <Route path="/cards/:collectionId" element={<Cards />} />
        <Route path="/cards" element={<Cards />} />
        <Route path="/cards-detailed/:cardId" element={<CardsDetailed />} />
      </Routes>
    </div>
  );
};

export default App;

