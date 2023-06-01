import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate , Link } from 'react-router-dom';
import './collection.css';
import loading from '../image/gif/loadingCollection.gif';
import fondImage from '../image/video/Pokemon-Background-Loop.mp4';
import banderoleImage from '../image/banderole.png';


const Collection = () => {
  const [collections, setCollections] = useState([]); 
  const [isLoading, setIsLoading] = useState(true); 
  const sliderRef = useRef(null);
  const [hoveredItem, setHoveredItem] = useState(null); 
  const navigate = useNavigate();


  const [cardData, setCardData] = useState(null);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get('http://localhost:4000/collections');
        setCollections(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des collections:', error);
      }
    };
  
    fetchCollections();
  }, []);
  
  useEffect(() => {
    if (collections.length > 0) {
      const randomIndex = Math.floor(Math.random() * collections.length);
      const randomCollection = collections[randomIndex].id;
      const params = new URLSearchParams();
      params.append('collectionId', randomCollection);
      const url = `http://localhost:4000/cards?${params.toString()}`;
      const fetchData = async () => {
        try {
          const response = await axios.get(url);
          const randomIndex2 = Math.floor(Math.random() * response.data.length);
          const randomCards = response.data[randomIndex2].id;
          const responseCardData = await axios.get(`http://localhost:4000/cards-detailed/${randomCards}`);
          setCardData(responseCardData.data);
        } catch (error) {
          console.error('Erreur lors de la récupération des données aléatoires:', error);
        }
        setIsLoading(false);
      };
      fetchData();
    }
  }, [collections]);

  const handleNextSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += sliderRef.current.offsetWidth;
    }
  };

  const handlePrevSlide = () => {
    sliderRef.current.scrollLeft -= sliderRef.current.offsetWidth; 
  };

  const handleImageClick = (event, selectedId) => {
    localStorage.setItem('selectedCollectionId', selectedId); 
    navigate(`/cards/${selectedId}`); 
  };

  // Défilement automatique vers la droite toutes les 6 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      handleNextSlide(); 
    }, 6000);

    return () => clearInterval(interval);
  }, []);

return (
  <div className="pt-20 mx-4"> 
    <div className="background-image">
      <div className="carousel-container">        
        {isLoading ? (
          <div className="carousel-loading flex justify-center items-center flex-col-reverse">
            <h1 className="text-2xl font-bold mb-4 text-center text-white">Loading ...</h1>
            <img src={loading} alt="Chargement en cours" />
          </div>
        ) : (
          <div className="carousel-wrapper">
            <h1 className="text-2xl font-bold mb-4 text-center text-white">Les différents Boosters</h1>
            <div className="carousel" ref={sliderRef}>
              {collections?.map((collection, index) => (
                <div
                  key={collection.id}
                  className={`carousel-item ${hoveredItem === index ? 'hovered' : ''}`} 
                  onMouseEnter={() => setHoveredItem(index)} 
                  onMouseLeave={() => setHoveredItem(null)}
                  onClick={(event) => handleImageClick(event, collection.id)}
                >
                  <h2 className="text-lg font-bold">{collection.name}</h2>
                  <img src={collection.images.logo} alt={collection.name} className="w-full" />
                </div>
              ))}
            </div>
            <button
              className="carousel-control prev"
              onClick={handlePrevSlide}
              aria-label="Précédent"
            >
              Précédent
            </button>
            <button
              className="carousel-control next"
              onClick={handleNextSlide}
              aria-label="Suivant"
            >
              Suivant
            </button>
          </div>
        )}
      </div>
    </div>
<div className="banner-wrapper">
  {cardData && (
    <div className="flex relative justify-center mt-8 sm:mt-6 md:mt-8 lg:mt-10">
      <div className="z-20">
        <h2 className="mb-4 text-2xl font-bold text-white">Cartes aléatoires :</h2>
        <h2 className="mb-4 text-2xl font-bold text-white text-center">{cardData.name}</h2>
      </div>
      <img src={banderoleImage} alt="Banderole" className="absolute top-0 left-0 w-full z-10 h-40 sm:h-32 md:h-40 lg:h-48 xl:h-56" />
    </div>
  )}
</div>
    <div className="flex relative justify-center mt-1">
      <div className="relative z-10">
        {cardData && (
          <div className="flex">
            <div className="text-center flex flex-col justify-start">
              <div className="p-4 max-w-[300px] mx-auto text-white">
                <div className="p-4 flex items-center justify-center">
                < Link key={cardData.id} to={`/cards-detailed/${cardData.id}`} className="p-4 rounded hover:shadow-md hover:bg-yellow-200">
                  <img src={cardData.images.small} alt={cardData.name}/>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <video src={fondImage} autoPlay loop className="absolute top-0 left-0 w-full h-full object-cover z-0" />
  </div>

    
  </div>
);

};

export default Collection;