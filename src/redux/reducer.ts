import { StateType, ActionType, AnimeCardType } from '../types'
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

const initialState: StateType = {
  animeList: initialCards,
  currPage: 1,
  filters: { rating: [], genres: [] },
  genres: [],
  isLoadingAnime: false,
  isLoadingGenres: false,
  isAnimeError: false,
  isGenresError: false,
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
