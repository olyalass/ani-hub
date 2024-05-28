import { StateType } from '../types'
import { ActionType } from './actions'
import * as actionTypes from './actionTypes'

const initialSearchFormData = {
  order_by: 'score',
  isAscending: false,
  q: null,
  rating: null,
  genres: [],
  genres_exclude: [],
  status: null,
}

const initialState: StateType = {
  animeList: null,
  currPage: 1,
  monoFilter: { rating: null, genre: null },
  multiFilters: initialSearchFormData,
  genres: [],
  animePageData: null,
  isLoadingAnime: false,
  isLoadingGenres: false,
  isLoadingAnimePage: false,
  isAnimeError: false,
  isGenresError: false,
  isAnimePageError: false,
  isAnimeListEmpty: false,
  isEmptyPage: false,
  q: null,
  totalPages: 1,
}

const reducer = (
  state: StateType = initialState,
  action: ActionType,
): StateType => {
  switch (action.type) {
    case actionTypes.FETCH_ANIME_REQUEST:
      return {
        ...state,
        isLoadingAnime: true,
        isAnimeError: false,
        isAnimeListEmpty: false,
      }
    case actionTypes.FETCH_ANIME_SUCCESS:
      return {
        ...state,
        isLoadingAnime: false,
        animeList: action.payload.data,
        totalPages: action.payload.totalPages,
      }
    case actionTypes.FETCH_ANIME_FAILURE:
      return { ...state, isLoadingAnime: false, isAnimeError: true }
    case actionTypes.FETCH_ANIME_EMPTY:
      return {
        ...state,
        isLoadingAnime: false,
        isAnimeError: false,
        isAnimeListEmpty: true,
      }
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
      return { ...state, monoFilter: action.payload }
    case actionTypes.SET_MONO_GENRE:
      return { ...state, monoFilter: action.payload }
    case actionTypes.CLEAR_FILTERS:
      return { ...state, monoFilter: { rating: null, genre: null } }
    case actionTypes.SET_MULTI_FILTERS:
      return { ...state, multiFilters: action.payload }
    case actionTypes.CLEAR_MULTI_FILTERS:
      return { ...state, multiFilters: initialSearchFormData }
    case actionTypes.SET_GENRE_TO_MULTI_FILTERS:
      return {
        ...state,
        multiFilters: { ...initialSearchFormData, genres: [action.payload] },
      }
    case actionTypes.SET_Q_TO_MULTI_FILTERS:
      return {
        ...state,
        multiFilters: { ...initialSearchFormData, q: action.payload },
      }
    default:
      return initialState
  }
}

export default reducer
