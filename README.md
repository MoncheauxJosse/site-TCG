# site-TCG
site TCG pokemon  donnant accès à l’intégralité des cartes qui existent ainsi que de la description de celles-ci. Le site web utilise un référentiel de cartes existant.  

# Documentation du Site

# Introduction
Le site est une application web permettant de visualiser des cartes Pokémon détaillées.

# Installation
1. Clonez le dépôt GitHub du projet : git clone <URL du dépôt>

2. Accédez au répertoire du projet : cd <répertoire du projet>

3. Installez les dépendances : npm install

4. Accédez au répertoire client : cd client

5. Installez les dépendances du client : npm install

# Exécution
1.Accédez au répertoire du projet : cd site-TCG

2.Lancez l'application en mode développement : npm run start

# Fonctionnalités
Affichage des cartes détaillées :

L'application permet d'afficher les détails d'une carte Pokémon spécifique.

Endpoints

GET /cards-detailed/{cardId} : Récupère les détails d'une carte Pokémon en fonction de son ID.

### Util :

Affichage des images d'énergie :
L'application affiche les images d'énergie associées à une carte Pokémon.

### Composants :

1. CardsDetailed :
Affiche les détails d'une carte Pokémon spécifique et un slider des cartes portant le même nom.

2. Cards :
Affiche toutes les cartes Pokémon existantes avec un filtre lié aux différents boosters et un système de recherche lié au nom du Pokémon.

3. Collection :
Affiche un slider de chaque booster différent, avec une redirection vers Cards si l'un d'entre eux est sélectionné.
Affiche une carte aléatoire, avec une redirection vers CardsDetailed si sélectionnée.

# Fonctions

importAll(r) : Importe toutes les images d'énergie à partir d'un répertoire.
getImageForCost(cost) : Récupère l'image correspondante à un coût spécifique.

# Technologies utilisées

React : une bibliothèque JavaScript pour la construction d'interfaces utilisateur.

React Router : une bibliothèque de routage pour React.

Axios : une bibliothèque pour effectuer des requêtes HTTP.

Tailwind CSS : un framework CSS utilitaire pour le développement rapide.

Autoprefixer : un plugin PostCSS pour ajouter automatiquement les préfixes CSS appropriés.

PostCSS : un outil de transformation de CSS.

Express : un framework web pour Node.js permettant de créer des applications web et des API.

Cors : un package middleware qui permet d'activer les requêtes cross-origin (CORS) dans une application Express.

Concurrently : un package npm permettant d'exécuter plusieurs commandes en parallèle dans l'environnement de développement. (ainsi lancé les 2 api en même temps )

# Structure du projet
```
├── Back/                        # Répertoire Api server
│    ├── connect/                # URL connexion a axios
│    └── route/                  # route de connexion
├── client/                      # Répertoire Api react
│    ├── src/                    # Répertoire source
│    │   ├── components/         # Composants React
│    │   ├── componentsFixe/     # Composants Fixe React (menu)
│    │   ├── images/             # Images du site
│    │   ├── util/               # Fonction util pour les component
│    │   ├── App.js              # Composant principal de l'application
│    │   └── index.js            # Point d'entrée de l'application
│    ├── package.json            # Fichier de configuration du projet React
│    └── README.md               # Fichier README du projet
├── package.json                # Fichier de configuration du projet Server
├── README.md                   # Fichier README du projet
└── server.js                    # Fichier main du projet
```
