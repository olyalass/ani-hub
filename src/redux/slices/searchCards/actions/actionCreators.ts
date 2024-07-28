import { AnimeCardType } from '../../../../types'
import {
  FetchSearchCardsDataEmptyActionType,
  FetchSearchCardsDataFailureActionType,
  FetchSearchCardsDataRequestActionType,
  FetchSearchCardsDataSuccessActionType,
} from './actions'
import * as actionTypes from './actionTypes'

export const fetchSearchCardsDataRequest =
  (): FetchSearchCardsDataRequestActionType => {
    return {
      type: actionTypes.FETCH_SEARCH_CARDS_DATA_REQUEST,
    }
  }

export const fetchSearchCardsDataSuccess = (
  data: AnimeCardType[],
  totalPages: number,
): FetchSearchCardsDataSuccessActionType => {
  return {
    type: actionTypes.FETCH_SEARCH_CARDS_DATA_SUCCESS,
    payload: { data, totalPages },
  }
}

export const fetchSearchCardsDataFailure =
  (): FetchSearchCardsDataFailureActionType => {
    return {
      type: actionTypes.FETCH_SEARCH_CARDS_DATA_FAILURE,
    }
  }

export const fetchSearchCardsDataEmpty =
  (): FetchSearchCardsDataEmptyActionType => {
    return {
      type: actionTypes.FETCH_SEARCH_CARDS_DATA_EMPTY,
    }
  }
