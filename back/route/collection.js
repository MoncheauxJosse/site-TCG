import express from 'express';
import axios from 'axios';
import {API_COLLECTIONS_BASE_URL} from '../connect/connects.js'

const routersCollection = express.Router()

routersCollection.get('/', async (req, res) => {
    try {
      const response = await axios.get(`${API_COLLECTIONS_BASE_URL}`);
      const collections = response.data.data;
      res.json(collections);
    } catch (error) {
      console.error('Error retrieving collections:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  })

  export { routersCollection };