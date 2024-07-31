import { PageStateType } from '../../../types'
import { PageActionType } from './index'
import * as actionTypes from './actions/actionTypes'

const initialState: PageStateType = {
  data: null,
  isLoading: false,
  isError: false,
  isEmpty: false,
}

const pageReducer = (
  state: PageStateType = initialState,
  action: PageActionType,
): PageStateType => {
  switch (action.type) {
    case actionTypes.FETCH_ANIME_PAGE_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isEmpty: false,
      }
    case actionTypes.FETCH_ANIME_PAGE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      }
    case actionTypes.FETCH_ANIME_PAGE_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      }
    case actionTypes.FETCH_ANIME_PAGE_EMPTY:
      return {
        ...state,
        isLoading: false,
        isEmpty: true,
      }
    default:
      return state
  }
}

export default pageReducer
