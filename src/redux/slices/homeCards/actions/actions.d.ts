import * as actionTypes from './actionTypes'
import { CardDataType } from '../../../../types'

type FetchHomeCardsDataRequestActionType = {
  type: typeof actionTypes.FETCH_HOME_CARDS_DATA_REQUEST
}

type FetchHomeCardsDataSuccessActionType = {
  type: typeof actionTypes.FETCH_HOME_CARDS_DATA_SUCCESS
  payload: { data: CardDataType[]; totalPages: number }
}

type FetchHomeCardsDataFailureActionType = {
  type: typeof actionTypes.FETCH_HOME_CARDS_DATA_FAILURE
}

type FetchHomeCardsDataEmptyActionType = {
  type: typeof actionTypes.FETCH_HOME_CARDS_DATA_EMPTY
}

type ClearHomeFiltersActionType = {
  type: typeof actionTypes.CLEAR_HOME_FILTERS
}

type SetGenreToHomeFiltersActionType = {
  type: typeof actionTypes.SET_GENRE_TO_HOME_FILTERS
  payload: string
}

type SetRatingToHomeFiltersActionType = {
  type: typeof actionTypes.SET_RATING_TO_HOME_FILTERS
  payload: string
}

export type HomeCardsActionType =
  | FetchHomeCardsDataRequestActionType
  | FetchHomeCardsDataSuccessActionType
  | FetchHomeCardsDataEmptyActionType
  | FetchHomeCardsDataFailureActionType
  | ClearHomeFiltersActionType
  | SetGenreToHomeFiltersActionType
  | SetRatingToHomeFiltersActionType
