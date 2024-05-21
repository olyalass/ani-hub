import { StateType, ActionType } from '../types'
import * as actionTypes from './actionTypes'

// const initialCards: AnimeCardType[] = [
//   {
//     titleEnglish: 'Attack on Titan',
//     titleOrig: 'Shingeki no Kyojin',
//     id: 16498,
//     genres: [
//       { name: 'Action', id: 1 },
//       { name: 'Award Winning', id: 46 },
//       { name: 'Drama', id: 8 },
//       { name: 'Suspense', id: 41 },
//     ],
//     img: 'https://cdn.myanimelist.net/images/anime/10/47347.jpg',
//     rating: 'R - 17+ (violence & profanity)',
//   },
// ]

// const initialAnimePage: AnimePageDataType = {
//   cardTitle: 'Attack on Titan',
//   japTitle: 'Shingeki no Kyojin',
//   rating: 'R - 17+ (violence & profanity)',
//   genres: [
//     { label: 'Action', key: 1 },
//     { label: 'Award Winning', key: 46 },
//     { label: 'Drama', key: 8 },
//     { label: 'Suspense', key: 41 },
//   ],

//   id: 16498,
//   img: 'https://cdn.myanimelist.net/images/anime/10/47347l.jpg',
//   episodes: 25,
//   year: 2013,
//   synopsis:
//     'Centuries ago, mankind was slaughtered to near extinction by monstrous humanoid creatures called Titans, forcing humans to hide in fea…',
//   status: 'Finished Airing',
//   score: 8.54,
//   producers: [
//     'Production I.G',
//     'Dentsu',
//     'Mainichi Broadcasting System',
//     'Pony Canyon',
//     'Kodansha',
//     'Pony Canyon Enterprises',
//   ],
// }

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
      return { ...state, isLoadingAnime: false, animeList: action.payload }
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
    case actionTypes.SET_TOTAL_PAGES:
      return { ...state, totalPages: action.payload }
    case actionTypes.CLEAR_TOTAL_PAGES:
      return { ...state, totalPages: 1 }
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
