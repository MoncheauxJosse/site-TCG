import React, { useState, useEffect, useRef } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import fondImage from '../image/video/Pokemon-Background-Loop.mp4';
import loading from '../image/gif/loadingCollection.gif';


//recupere toute les images energie 
const importAll = (r) => {
  let images = {};
  r.keys().map((item, index) => {
    images[item.replace('./', '')] = r(item);
    return null;
  });
  return images;
};

// utilise la fonction importAll pour récuperer toutes les images avec l'extension choisie (jpg , png , ect...)
const images = importAll(require.context('../image/energie', true, /\.(png|jpe?g|svg)$/));


const CardsDetailed = () => {

  //----------détail de carte ----------------
  const { cardId } = useParams(); // Récupère l'ID de la carte depuis l'URL
  const [cardData, setCardData] = useState(null);

  //----------------Slider----------------------------
  const [collections, setCollections] = useState([]); // État pour stocker les collections
  const [isLoading, setIsLoading] = useState(true); // État pour indiquer si le chargement est en cours
  const sliderRef = useRef(null); // Référence à l'élément du slider
  const [hoveredItem, setHoveredItem] = useState(null); // État pour suivre l'élément survolé
  const navigate = useNavigate(); 

  // Défilement vers la droite du slider
  const handleNextSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += sliderRef.current.offsetWidth; 
    }
  };

    // Défilement vers la gauche du slider
  const handlePrevSlide = () => {
    sliderRef.current.scrollLeft -= sliderRef.current.offsetWidth; 
  };

  // click sur l'image pour changer de carte
  const handleImageClick = (event, selectedId) => {
    navigate(`/cards-detailed/${selectedId}`);
  };

  //trie les image "energie" en fonction du retour du cost ( dans le map)
  const getImageForCost = (cost) => {
    const imageName = cost.toString(); 
    const imageWithoutExtension = imageName+'.png';
    const matchingImage = images[imageWithoutExtension];
    
    if (matchingImage) {
      return matchingImage;
    } else {
      return null;
    }
  };

  useEffect(() => {

    let nameCards

    const fetchCardData = async () => {

      // affiche la carte détaillé
      try {
        const response = await axios.get(`http://localhost:4000/cards-detailed/${cardId}`); 
        setCardData(response.data);
        nameCards = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des données de la carte:', error);
      }

      // affiche dans le slider les carte portant le meme nom que la cartes détailé
      try {
        const params = new URLSearchParams();
        params.append('name', nameCards.name);
        const url =`http://localhost:4000/cards?${params.toString()}`
        const response1 = await axios.get(url); 
        setCollections(response1.data); 
        setIsLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des cartes du même nom:', error);
      }
    };
    fetchCardData();
  }, [cardId]);

  // Défilement automatique du slider vers la droite (toutes les 6 secondes)
  useEffect(() => {
    const interval = setInterval(() => {
      handleNextSlide(); 
    }, 6000);
    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="pt-20 mx-4">
      <div className="flex relative justify-center">
        <div className="relative z-10">
          {cardData ? (
            <div className="flex">
              <div className="text-center flex flex-col justify-start">
                <div className="p-4 max-w-[300px] mx-auto bg-black bg-opacity-40 text-white">
                  <h2 className="mb-4 text-2xl font-bold">{cardData.name}</h2>
                  <div className="p-4 flex items-center justify-center">
                    <img src={cardData.images.small} alt={cardData.name} />
                  </div>
                </div>
              </div>
              <div className="p-4 flex flex-col justify-start ml-6 bg-black bg-opacity-40 text-white">
              {cardData.hp && (
               <div className="text-center text-2xl font-bold">
               <div className="flex flex-wrap items-center">
                 <div className="mr-10">
                 PV: {cardData.hp} 
                 </div>
                 <div className="flex items-center">
                      <span className="mr-2">Type:</span>
                 {cardData.types.map((types, index) => (
                   <div key={index}>
                      <img src={getImageForCost(types)} alt={types} className="w-8 h-8" />
                      </div>
                    ))}
                 </div>
               </div>
             </div>
             
              )}
              {cardData.rules && (
                <div>
                <div className="text-center underline text-2xl font-bold">Effet :</div>
                <div className="text-center">{cardData.rules}</div>
                </div>
              )}


                {cardData.abilities && (
                  <div className="mt-6">
                    <h3 className="text-xl underline font-bold mb-4">Talents :</h3>
                    {cardData.abilities.map((ability, index) => (
                      <div key={index} className="mb-4">
                        <div className="font-bold">{ability.name}</div>
                        <div>{ability.text}</div>
                      </div>
                    ))}
                  </div>
                )}

                {cardData.attacks && (
                <div className="mt-6">
                  <h3 className="text-xl underline font-bold mb-4">Attaques :</h3>
                  {cardData.attacks.map((attack, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex font-bold">
                      <div className="mr-2">
                        {attack.name}
                      </div> 
                      {attack.cost.map((cost, costIndex) => (
                        <span key={costIndex} className="mr-2">
                          <img src={getImageForCost(cost)} alt={cost} className="w-4 h-4" />
                        </span>
                      ))}
                    </div>
                    {attack.damage !== "" && (
                      <div> Dégats: {attack.damage}</div>
                    )}
                      <div>{attack.text}</div>
                      </div>
                      ))}
                      </div>
                      )}

              </div>
            </div>
          ) : (
            <p>Chargement en cours...</p>
          )}
        </div>
        <video src={fondImage} autoPlay loop className="absolute top-0 left-0 w-full h-full object-cover z-0" />
      </div>

      <div className="background-image mt-10">
      <div className="carousel-container">
        <h1 className="text-2xl font-bold mb-4 text-center text-white">Autres cartes</h1>
        {isLoading ? (
          <div className="carousel-loading flex justify-center items-center">
            <img src={loading} alt="Chargement en cours" />
          </div>
        ) : (
          <div className="carousel-wrapper">
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
                  <img src={collection.images.small} alt={collection.name} className="w-full" />
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
    </div>
  );
}  

export default CardsDetailed;