import {
  StateType,
  ActionType,
  AnimeCardType,
  AnimePageDataType,
} from '../types'
import * as actionTypes from './actionTypes'

const initialCards: AnimeCardType[] = [
  {
    titleEnglish: 'Attack on Titan',
    titleOrig: 'Shingeki no Kyojin',
    id: 16498,
    genres: [
      { name: 'Action', id: 1 },
      { name: 'Award Winning', id: 46 },
      { name: 'Drama', id: 8 },
      { name: 'Suspense', id: 41 },
    ],
    img: 'https://cdn.myanimelist.net/images/anime/10/47347.jpg',
    rating: 'R - 17+ (violence & profanity)',
  },
]

const initialAnimePage: AnimePageDataType = {
  cardTitle: 'Attack on Titan',
  japTitle: 'Shingeki no Kyojin',
  rating: 'R - 17+ (violence & profanity)',
  genres: [
    { label: 'Action', key: 1 },
    { label: 'Award Winning', key: 46 },
    { label: 'Drama', key: 8 },
    { label: 'Suspense', key: 41 },
  ],

  id: 16498,
  img: 'https://cdn.myanimelist.net/images/anime/10/47347l.jpg',
  episodes: 25,
  year: 2013,
  synopsis:
    'Centuries ago, mankind was slaughtered to near extinction by monstrous humanoid creatures called Titans, forcing humans to hide in fea…',
  status: 'Finished Airing',
  score: 8.54,
  producers: [
    'Production I.G',
    'Dentsu',
    'Mainichi Broadcasting System',
    'Pony Canyon',
    'Kodansha',
    'Pony Canyon Enterprises',
  ],
}

const initialState: StateType = {
  animeList: initialCards,
  currPage: 1,
  filters: { rating: [], genres: [] },
  genres: [],
  animePageData: initialAnimePage,
  isLoadingAnime: false,
  isLoadingGenres: false,
  isLoadingAnimePage: false,
  isAnimeError: false,
  isGenresError: false,
  isAnimePageError: false,
  isEmptyPage: false,
}

const reducer = (
  state: StateType = initialState,
  action: ActionType,
): StateType => {
  switch (action.type) {
    case actionTypes.FETCH_ANIME_REQUEST:
      return { ...state, isLoadingAnime: true, isAnimeError: false }
    case actionTypes.FETCH_ANIME_SUCCESS:
      return { ...state, isLoadingAnime: false, animeList: action.payload }
    case actionTypes.FETCH_ANIME_FAILURE:
      return { ...state, isLoadingAnime: false, isAnimeError: true }
    case actionTypes.FETCH_GENRES_REQUEST:
      return { ...state, isLoadingGenres: true, isGenresError: false }
    case actionTypes.FETCH_GENRES_SUCCESS:
      return { ...state, isLoadingGenres: false, genres: action.payload }
    case actionTypes.FETCH_GENRES_FAILURE:
      return { ...state, isLoadingGenres: false, isGenresError: true }
    case actionTypes.FETCH_ANIME_PAGE_REQUEST:
      return {
        ...state,
        isLoadingAnimePage: true,
        isAnimePageError: false,
        isEmptyPage: false,
      }
    case actionTypes.FETCH_ANIME_PAGE_SUCCESS:
      return {
        ...state,
        isLoadingAnimePage: false,
        animePageData: action.payload,
      }
    case actionTypes.FETCH_ANIME_PAGE_FAILURE:
      return { ...state, isLoadingAnimePage: false, isAnimePageError: true }
    case actionTypes.FETCH_ANIME_PAGE_EMPTY:
      return {
        ...state,
        isLoadingAnimePage: false,
        isAnimePageError: false,
        isEmptyPage: true,
      }
    case actionTypes.SET_MONO_RATING:
      return { ...state, filters: action.payload }
    case actionTypes.SET_MONO_GENRE:
      return { ...state, filters: action.payload }
    case actionTypes.CLEAR_FILTERS:
      return { ...state, filters: { rating: [], genres: [] } }
    default:
      return initialState
  }
}

export default reducer
