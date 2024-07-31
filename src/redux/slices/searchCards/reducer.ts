import { SearchCardsStateType } from '../../../types'
import { SearchCardsActionType } from './actions/actions'
import * as actionTypes from './actions/actionTypes'

const initialState: SearchCardsStateType = {
  data: null,
  isLoading: false,
  isError: false,
  isEmpty: false,
  currPage: 1,
  totalPages: 1,
}

const searchCardsReducer = (
  state: SearchCardsStateType = initialState,
  action: SearchCardsActionType,
): SearchCardsStateType => {
  switch (action.type) {
    case actionTypes.FETCH_SEARCH_CARDS_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isEmpty: false,
      }
    case actionTypes.FETCH_SEARCH_CARDS_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload.data,
        totalPages: action.payload.totalPages,
      }
    case actionTypes.FETCH_SEARCH_CARDS_DATA_FAILURE:
      return { ...state, isLoading: false, isError: true }
    case actionTypes.FETCH_SEARCH_CARDS_DATA_EMPTY:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isEmpty: true,
      }
    default:
      return state
  }
}

export default searchCardsReducer
