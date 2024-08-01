# Anime-Universe


## Description:
Anime catalogue, which supports different types of filters, user's custom lists and random anime suggestions

---

## Installation:
1. Clone repo https://github.com/olyalass/anime-universe.git
2. `npm install`
3. `npm run dev`

OR

## Deploy: 
[https://anime-universe.netlify.app](https://anime-universe.netlify.app)


## Features:
- fetch anime info from Jikan API
- get more info about the anime, clicking on the card
- get top anime on Home page or top anime in a particuular category
- search for animes on Search page according to advanced filters (including rating, genres, titles, excluded genres, status) in a chosen order
- get random anime on Random page (**custom made**, not from API)
- create your custom lists (stored in your inxedDB) with any animes you want
- add animes to your lists from any page (if it shows you any anime info ofc)
- share your list with others
- save a shared list to your lists


## Architecture & technologies: 
- **React** & **Redux** based 
- navigation via **react-router**
- **redux-thunk**
- **indexedDB** to store custom lists
- using query params
- custom **react hooks**
- **Vite** build
- modified AntDesign **UI-kit**


---

## Contacts:
- **Name:** *Olga Lass*
- **email:** *olyalass@icloud.com*
