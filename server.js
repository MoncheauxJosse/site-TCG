import express from 'express';
import cors from 'cors';
import { routersCollection } from './back/route/collection.js';
import { routerCards } from './back/route/cards.js';
import { routerCardsDetailed } from './back/route/cardsDetailed.js'

const app = express();
app.use(cors());
const PORT = process.env.PORT || 4000;


app.use('/collections',routersCollection)
app.use('/cards',routerCards);
app.use('/cards-detailed',routerCardsDetailed);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
