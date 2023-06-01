import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../image/tcg-logo.png';

const Menu = () => {

  return (
    <nav className="fixed top-0 left-0 z-50 right-0 bg-gray-800 text-white p-4 grid grid-cols-3 gap-4 items-center">
      <div className="col-span-1 flex items-center">
        <Link to="/">
          <img src={logo} alt="Logo" className="h-9 mr-4 hover:scale-110" />
        </Link>
      </div>
      <div className="col-span-1 flex justify-center">
        <ul className="flex space-x-4">
          <li>
            <Link to="/">Accueil</Link>
          </li>
          <li>
            <Link to="/cards">Les Cartes</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Menu;

