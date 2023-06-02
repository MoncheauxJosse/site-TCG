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

//trie les image "energie" en fonction du retour du cost ( dans le map)
const getImageForCost = (cost) => {
  const imageName = cost.toString();
  const imageWithoutExtension = imageName + '.png';
  const matchingImage = images[imageWithoutExtension];

  if (matchingImage) {
    return matchingImage;
  } else {
    return null;
  }
};

export { getImageForCost };