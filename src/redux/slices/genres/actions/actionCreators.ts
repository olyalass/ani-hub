import { GenreType } from '../../../../types'
import {
  FetchGenresFailureActionType,
  FetchGenresRequestActionType,
  FetchGenresSuccessActionType,
} from './actions'
import * as actionTypes from './actionTypes'

export const fetchGenresRequest = (): FetchGenresRequestActionType => {
  return {
    type: actionTypes.FETCH_GENRES_REQUEST,
  }
}

export const fetchGenresSuccess = (
  data: GenreType[],
): FetchGenresSuccessActionType => {
  return {
    type: actionTypes.FETCH_GENRES_SUCCESS,
    payload: data,
  }
}

export const fetchGenresFailure = (): FetchGenresFailureActionType => {
  return {
    type: actionTypes.FETCH_GENRES_FAILURE,
  }
}
