import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import video from '../image/video/pikachu-running.mp4';
import banderoleImage from '../image/banderole.png';

const Cards = () => {
  const [cards, setCards] = useState([]); 
 // stocke l'ID de la collection sélectionnée (<select>)
  const [selectedCollectionId, setSelectedCollectionId] = useState('');
  //recupere l'id de la collection dans local storage ou celui du <select>
  const collectionId = selectedCollectionId || localStorage.getItem('selectedCollectionId'); 
  const [searchTerm, setSearchTerm] = useState(''); 
  const [collections, setCollections] = useState([]); 
  const [collectionsLoading, setCollectionsLoading] = useState(true); 


  //affiche toute la collection dans le <select>
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get('http://localhost:4000/collections');
        setCollections(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des collections :', error);
      }
    };

    fetchCollections();
  }, []);


  // Effectue une requête pour récupérer les cartes en fonction de la collection et de la recherche du nom
  useEffect(() => {
    const selectedCollectionIdFromStorage = localStorage.getItem('selectedCollectionId');

    if (selectedCollectionIdFromStorage) {
      setSelectedCollectionId(selectedCollectionIdFromStorage);
    }

    setCollectionsLoading(true);
    const fetchCards = async () => {
      try {
        setCards([]); 
        const params = new URLSearchParams();

        if (collectionId !== undefined && collectionId !== 'Toutes les collections') {
          params.append('collectionId', collectionId);
        }
        if (searchTerm !== '') {
          params.append('name', searchTerm);
        }

        const url = `http://localhost:4000/cards?${params.toString()}`;
        const response = await axios.get(url);
        setCards(response.data);
        setCollectionsLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des cartes :', error);
        setCollectionsLoading(false);
      }
    };
  
    fetchCards();
  }, [collectionId, searchTerm]);

  // Gère le changement de collection sélectionnée <select>
  const handleCollectionChange = async (event) => {
    const selectedId = event.target.value || event.target.options[event.target.selectedIndex].text;
    setSelectedCollectionId(selectedId);
    localStorage.setItem('selectedCollectionId', selectedId);
    setCollectionsLoading(true);
    setSearchTerm('')
  };

  // Gère le changement de recherche de nom
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };


  return (
    <div className="pt-12">
      <h1>Les Cartes</h1>
      <div className="fixed flex flex-col items-center justify-center top-18 left-0 right-0">
        <img src={banderoleImage} alt="Banderole" className="absolute top-0 left-0 w-full" />
        <div className="flex items-center justify-center relative z-10 pt-6">
          <div className="mr-4">
            <select
              value={selectedCollectionId}
              onChange={handleCollectionChange}
              className="px-4 py-2 border rounded-md"
            >
              <option value=''>Toutes les collections</option>
              {collectionsLoading ? (
                <option>Loading...</option>
              ) : (
                collections.map((collection) => (
                  <option key={collection.id} value={collection.id}>
                    {collection.name}
                  </option>
                ))
              )}
            </select>
          </div>
          <div>
            {/* Champ de recherche */}
            <input
              type="text"
              placeholder="Rechercher par nom..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="px-4 py-2 border rounded-md"
            />
          </div>
        </div>
      </div>
      {collectionsLoading ? (
        <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center">
          {/* Animation de chargement */}
          <div className="relative w-full">
            <video src={video} autoPlay loop className="mx-auto" style={{ transform: 'scale(0.33)' }} />
          </div>
          <img src={banderoleImage} alt="Banderole" className="fixed bottom-0 left-0 w-full transform scale-y-[-1]" />
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-4 gap-4 mt-32">
            {/* Affichage des cartes */}
            {cards.map((card) => (
              <Link key={card.id} to={`/cards-detailed/${card.id}`} className="p-4 border border-gray-200 rounded hover:shadow-md hover:bg-yellow-200">
                <h2 className="text-lg font-bold">{card.name}</h2>
                <img src={card.images.small} alt={card.name} className="w-full" />
              </Link>
            ))}
          </div>
          <div>
            <img
              src={banderoleImage}
              alt="Banderole"
              className={collectionsLoading ? "hidden" : "top-0 left-0 w-full transform scale-y-[-1]"}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Cards;

