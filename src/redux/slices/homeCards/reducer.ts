import { HomeCardsStateType } from '../../../types'
import { HomeCardsActionType } from './actions/actions'
import * as actionTypes from './actions/actionTypes'

const initialState: HomeCardsStateType = {
  data: null,
  isLoading: false,
  isError: false,
  isEmpty: false,
  currPage: 1,
  totalPages: 1,
  filters: { rating: null, genre: null },
}

const homeCardsReducer = (
  state: HomeCardsStateType = initialState,
  action: HomeCardsActionType,
): HomeCardsStateType => {
  switch (action.type) {
    case actionTypes.FETCH_HOME_CARDS_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isEmpty: false,
      }
    case actionTypes.FETCH_HOME_CARDS_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload.data,
        totalPages: action.payload.totalPages,
      }
    case actionTypes.FETCH_HOME_CARDS_DATA_FAILURE:
      return { ...state, isLoading: false, isError: true }
    case actionTypes.FETCH_HOME_CARDS_DATA_EMPTY:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isEmpty: true,
      }
    case actionTypes.CLEAR_HOME_FILTERS:
      return {
        ...state,
        filters: { rating: null, genre: null },
      }
    case actionTypes.SET_GENRE_TO_HOME_FILTERS:
      return {
        ...state,
        filters: { rating: null, genre: action.payload },
      }
    case actionTypes.SET_RATING_TO_HOME_FILTERS:
      return {
        ...state,
        filters: { rating: action.payload, genre: null },
      }
    default:
      return state
  }
}

export default homeCardsReducer
