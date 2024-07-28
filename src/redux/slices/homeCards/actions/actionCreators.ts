import { AnimeCardType } from '../../../../types'
import {
  ClearHomeFiltersActionType,
  FetchHomeCardsDataEmptyActionType,
  FetchHomeCardsDataFailureActionType,
  FetchHomeCardsDataRequestActionType,
  FetchHomeCardsDataSuccessActionType,
  SetGenreToHomeFiltersActionType,
  SetRatingToHomeFiltersActionType,
} from './actions'
import * as actionTypes from './actionTypes'

export const fetchHomeCardsDataRequest =
  (): FetchHomeCardsDataRequestActionType => {
    return {
      type: actionTypes.FETCH_HOME_CARDS_DATA_REQUEST,
    }
  }

export const fetchHomeCardsDataSuccess = (
  data: AnimeCardType[],
  totalPages: number,
): FetchHomeCardsDataSuccessActionType => {
  return {
    type: actionTypes.FETCH_HOME_CARDS_DATA_SUCCESS,
    payload: { data, totalPages },
  }
}

export const fetchHomeCardsDataFailure =
  (): FetchHomeCardsDataFailureActionType => {
    return {
      type: actionTypes.FETCH_HOME_CARDS_DATA_FAILURE,
    }
  }

export const fetchHomeCardsDataEmpty =
  (): FetchHomeCardsDataEmptyActionType => {
    return {
      type: actionTypes.FETCH_HOME_CARDS_DATA_EMPTY,
    }
  }

export const clearHomeFilters = (): ClearHomeFiltersActionType => {
  return {
    type: actionTypes.CLEAR_HOME_FILTERS,
  }
}

export const setGenreToHomeFilters = (
  genre: string,
): SetGenreToHomeFiltersActionType => {
  return {
    type: actionTypes.SET_GENRE_TO_HOME_FILTERS,
    payload: genre,
  }
}

export const setRatingToHomeFilters = (
  rating: string,
): SetRatingToHomeFiltersActionType => {
  return {
    type: actionTypes.SET_RATING_TO_HOME_FILTERS,
    payload: rating,
  }
}
