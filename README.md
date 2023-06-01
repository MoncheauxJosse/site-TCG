# site-TCG
site TCG pokemon  donnant accès à l’intégralité des cartes qui existent ainsi que de la description de celles-ci. Le site web utilise un référentiel de cartes existant.  

# Documentation du Site

# Introduction
Le site est une application web permettant de visualiser des cartes Pokémon détaillées.

# Installation
Clonez le dépôt GitHub du projet : git clone <URL du dépôt>
Accédez au répertoire du projet : cd <répertoire du projet>
Installez les dépendances : npm install

# Configuration
Renommez le fichier .env.example en .env.
Ouvrez le fichier .env et configurez les variables d'environnement si nécessaire.

# Exécution
Accédez au répertoire du projet : cd site-TCG
Lancez l'application en mode développement : npm run start

# Fonctionnalités
Affichage des cartes détaillées
L'application permet d'afficher les détails d'une carte Pokémon spécifique.

Endpoints
GET /cards-detailed/{cardId} : Récupère les détails d'une carte Pokémon en fonction de son ID.

Composants
CardsDetailed : Affiche les détails d'une carte Pokémon spécifique.
Affichage des images d'énergie
L'application affiche les images d'énergie associées à une carte Pokémon.

# Fonctions

importAll(r) : Importe toutes les images d'énergie à partir d'un répertoire.
getImageForCost(cost) : Récupère l'image correspondante à un coût spécifique.

# Technologies utilisées
React : une bibliothèque JavaScript pour la construction d'interfaces utilisateur.
React Router : une bibliothèque de routage pour React.
Axios : une bibliothèque pour effectuer des requêtes HTTP.
Tailwind CSS : un framework CSS utilitaire pour le développement rapide.
Eslint : un linter pour identifier et signaler les problèmes dans le code JavaScript.
# Structure du projet

echo "├── Back/                        # Répertoire Api server"
echo "│         ├── connect/                        # URL connexion a axios"
echo "│         ├── route/                              # route de connexion"
echo "├── client/                        # Répertoire Api react"
echo "│         ├── src/                        # Répertoire source"
echo "│         │   ├── components/             # Composants React"
echo "│         │   ├── componentsFixe/    # Composants Fixe React (menu)"
echo "│         │   ├── images/                 # Images du site"
echo "│         │   ├── App.js                  # Composant principal de l'application"
echo "│         │   └── index.js                # Point d'entrée de l'application"
echo "│        ├── package.json                # Fichier de configuration du projet React"
echo "│       └── README.md                   # Fichier README du projet"
echo "├── package.json                # Fichier de configuration du projet Server"
echo "├── README.md                   # Fichier README du projet"
echo "└── server.js                             # Fichier main du projet"
