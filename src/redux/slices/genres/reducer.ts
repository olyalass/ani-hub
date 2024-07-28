import { GenresStateType } from '../../../types'
import { GenresActionType } from './actions/actions'
import * as actionType from './actions/actionTypes'

const initialState: GenresStateType = {
  genres: [],
  isLoading: false,
  isError: false,
}

const genresReducer = (
  state: GenresStateType = initialState,
  action: GenresActionType,
): GenresStateType => {
  switch (action.type) {
    case actionType.FETCH_GENRES_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    case actionType.FETCH_GENRES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        genres: action.payload,
      }
    case actionType.FETCH_GENRES_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      }
    default:
      return state
  }
}

export default genresReducer
