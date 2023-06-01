import express from 'express';
import axios from 'axios';
import {API_CARDS_BASE_URL} from '../connect/connects.js'
const routerCards = express.Router()

routerCards.get('/', async (req, res) => {
  const { collectionId } = req.query;

  try {
    let response;
    

    if (req.query.name) {
      
       
      if (collectionId !== undefined) {
       
        response = await axios.get(`${API_CARDS_BASE_URL}?q=set.id:${collectionId}`);
        response.data.data = response.data.data.filter((card) =>
        card.name.toLowerCase().includes(req.query.name.toLowerCase())
        );
      } else {
        
        let nomTrie
        const nameArray = req.query.name.split(" ");
        const finalname = nameArray.pop()
        const spliteName = finalname.split("");
        const numberFinalName = spliteName.length
        
        if(numberFinalName>3){
          nomTrie = finalname.toLowerCase();
        }else{
          nomTrie = nameArray[0].toLowerCase();
        }

        response = await axios.get(`${API_CARDS_BASE_URL}?q=name:${nomTrie.toString()}`);
      }
    }else{

      if (collectionId !== undefined) {
        response = await axios.get(`${API_CARDS_BASE_URL}?q=set.id:${collectionId}`);
      } else {
        response = await axios.get(`${API_CARDS_BASE_URL}`);
      }

    }
    

    
    const cards = response.data.data;

    res.json(cards);
  } catch (error) {
    console.error('Error retrieving cards:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

export { routerCards };
