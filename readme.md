# ReactSage

*ReactSage est une app mobile permettant un échange via Websockets entre 2 personnes*
*Une sorte de iMessages, les personnes peuvent créer, gérer une conversation, envoyer des messages voir les derniers messages vus*

## Installation des dépendances pour l'application

- App

*A la racine du projet, il est nécessaire de créer un fichier .env.local avec le contenu suivant, le lancement du serveur modifiera la valeur de l'ip correctement*

```env
EXPO_PUBLIC_SERVER_IP=192.168.0.34
```


```bash
npm install
```

- Server

```bash
cd server
npm install
```

## Démarrage de l'app

- Server:

```bash
cd server
node .\build\main.js -r
```

*L'option -r, permettra de corriger si nécessaire le fichier .env.local*

- App:

```bash
npm run start
```

*Pour utiliser l'app mobile vous devez avoir installé au préalable Expo Go sur votre smartphone, de préférence un iPhone, certaines fonctionnalités n'ont pas été écrites pour Android*