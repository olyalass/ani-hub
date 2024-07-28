import * as actionTypes from './actionTypes'
import { CardDataType } from '../../../../types'

type FetchSearchCardsDataRequestActionType = {
  type: typeof actionTypes.FETCH_SEARCH_CARDS_DATA_REQUEST
}

type FetchSearchCardsDataSuccessActionType = {
  type: typeof actionTypes.FETCH_SEARCH_CARDS_DATA_SUCCESS
  payload: { data: CardDataType[]; totalPages: number }
}

type FetchSearchCardsDataFailureActionType = {
  type: typeof actionTypes.FETCH_SEARCH_CARDS_DATA_FAILURE
}

type FetchSearchCardsDataEmptyActionType = {
  type: typeof actionTypes.FETCH_SEARCH_CARDS_DATA_EMPTY
}

export type SearchCardsActionType =
  | FetchSearchCardsDataRequestActionType
  | FetchSearchCardsDataSuccessActionType
  | FetchSearchCardsDataEmptyActionType
  | FetchSearchCardsDataFailureActionType
