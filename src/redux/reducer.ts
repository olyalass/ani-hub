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
}

const reducer = (
  state: StateType = initialState,
  action: ActionType,
): StateType => {
  switch (action.type) {
    case actionTypes.UPDATE_ANIME_LIST:
      return { ...state, animeList: action.payload }
    default:
      return initialState
  }
}

export default reducer
