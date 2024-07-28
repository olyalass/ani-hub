import { GenreType } from '../../../../types'
import * as actionTypes from './actionTypes'

type FetchGenresRequestActionType = {
  type: typeof actionTypes.FETCH_GENRES_REQUEST
}

type FetchGenresSuccessActionType = {
  type: typeof actionTypes.FETCH_GENRES_SUCCESS
  payload: GenreType[]
}

type FetchGenresFailureActionType = {
  type: typeof actionTypes.FETCH_GENRES_FAILURE
}

export type GenresActionType =
  | FetchGenresRequestActionType
  | FetchGenresSuccessActionType
  | FetchGenresFailureActionType
