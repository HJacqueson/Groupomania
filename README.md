# Groupomania

## P7 - Créez un réseau social d’entreprise

Installez l'application de Groupomania

## Backend

Le backend a été crée avec **Node.js**, **Express.js** et **MongoDB** comme base de données.

### Installation

Dans le terminal de VSCODE, situez-vous dans le dossier **/backend** en tapant **cd backend**.
Entrez la commande **yarn install** dans le terminal pour installer toutes les dependances du backend.

### Development server

Entrez la commande **nodemon app** dans le terminal pour avoir accès au serveur de développement. L'application se rechargera automatiquement à la modification d'un fichier source.

## Frontend

Le frontend a été crée avec **React.js** et **Bootstrap**.

### Installation

Dans le terminal de **VSCODE**, de votre éditeur de code ou de votre machine, situez-vous dans le dossier **/frontend** en tapant **cd frontend**.
Entrez la commande **yarn install** dans le terminal pour installer toutes les dépendances du frontend.

### Development server

Entrez la commande **yarn start** dans le terminal pour avoir accès au serveur de développement. L'application se rechargera automatiquement à la modification d'un fichier source.

## Base de Données

Dans votre terminal, sur le répertoire de votre MongoDB, entrez les commandes :
```
mongoimport --db Groupomania --collection users --type=json --
file /<chemin d’accès>/Creez_un_réseau_social_d’entreprise_jacqueson-herve/Jacqueson_Herve_1_bdd_082022/Goupomania/users.json
```
puis:
```
mongoimport --db Groupomania --collection users --type=json --
file /<chemin d’accès>/Creez_un_réseau_social_d’entreprise_jacqueson-herve/Jacqueson_Herve_1_bdd_082022/Goupomania/posts.json
```
Ensuite, rendez vous dans le backend sur le fichier app.js, sur la ligne 12 mongoose.connect afin de rentrer votre lien de connection à votre base de données, en lieu et place du lien déjà existant. 

Si vous n'êtes pas un utilisateur de MongoDB, il vous suffit de laisser le lien mongoose.connect du fichier app.js du backend telles quelles, pour vous connecter directement à la base données originelle.


