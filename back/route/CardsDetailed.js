import express from 'express';
import axios from 'axios';
import {API_CARDS_BASE_URL} from '../connect/connects.js'

const routerCardsDetailed = express.Router();

// Route pour récupérer les détails d'une carte par ID
routerCardsDetailed.get('/:cardId', async (req, res) => {
  const { cardId } = req.params;

  try {
    const response = await axios.get(`${API_CARDS_BASE_URL}/${cardId}`);
    const cardDetails = response.data.data;
    res.json(cardDetails);
  } catch (error) {
    console.error('Error retrieving card details:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

export { routerCardsDetailed };
