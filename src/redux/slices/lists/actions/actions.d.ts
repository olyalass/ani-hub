import { AnimeCardType, ListsType } from '../../../../types'
import * as actionTypes from './actionTypes'

type PostNewListRequestActionType = {
  type: typeof actionTypes.POST_NEW_LIST_REQUEST
}

type PostNewListSuccessActionType = {
  type: typeof actionTypes.POST_NEW_LIST_SUCCESS
  payload: { listName: string; value: number[] }
}

type PostNewListFailureActionType = {
  type: typeof actionTypes.POST_NEW_LIST_FAILURE
}

type PostNewItemToListRequestActionType = {
  type: typeof actionTypes.POST_NEW_ITEM_TO_LIST_REQUEST
}

type PostNewItemToListSuccessActionType = {
  type: typeof actionTypes.POST_NEW_ITEM_TO_LIST_SUCCESS
  payload: { listName: string; newId: number }
}

type PostNewItemToListFailureActionType = {
  type: typeof actionTypes.POST_NEW_ITEM_TO_LIST_FAILURE
}

type FetchListsRequestActionType = {
  type: typeof actionTypes.FETCH_LISTS_REQUEST
}

type FetchListsSuccessActionType = {
  type: typeof actionTypes.FETCH_LISTS_SUCCESS
  payload: ListsType
}

type FetchListsFailureActionType = {
  type: typeof actionTypes.FETCH_LISTS_FAILURE
}

type DeleteListRequestActionType = {
  type: typeof actionTypes.DELETE_LIST_REQUEST
}

type DeleteListSuccessActionType = {
  type: typeof actionTypes.DELETE_LIST_SUCCESS
  payload: string
}

type DeleteListFailureActionType = {
  type: typeof actionTypes.DELETE_LIST_FAILURE
}

type DeleteItemFromListRequestActionType = {
  type: typeof actionTypes.DELETE_ITEM_FROM_LIST_REQUEST
}

type DeleteItemFromListSuccessActionType = {
  type: typeof actionTypes.DELETE_ITEM_FROM_LIST_SUCCESS
  payload: { listName: string; animeId: number }
}

type DeleteItemFromListFailureActionType = {
  type: typeof actionTypes.DELETE_ITEM_FROM_LIST_FAILURE
}

type FetchListAnimesRequestActionType = {
  type: typeof actionTypes.FETCH_LIST_ANIMES_REQUEST
}

type FetchListAnimesSuccessActionType = {
  type: typeof actionTypes.FETCH_LIST_ANIMES_SUCCESS
  payload: AnimeCardType[]
}

type FetchListAnimesEmptyActionType = {
  type: typeof actionTypes.FETCH_LIST_ANIMES_EMPTY
}

type FetchListAnimesFailureActionType = {
  type: typeof actionTypes.FETCH_LIST_ANIMES_FAILURE
}

export type ListsActionType =
  | PostNewItemToListRequestActionType
  | PostNewItemToListSuccessActionType
  | PostNewItemToListFailureActionType
  | PostNewListRequestActionType
  | PostNewListSuccessActionType
  | PostNewListFailureActionType
  | DeleteListRequestActionType
  | DeleteListSuccessActionType
  | DeleteListFailureActionType
  | DeleteItemFromListRequestActionType
  | DeleteItemFromListSuccessActionType
  | DeleteItemFromListFailureActionType
  | FetchListsRequestActionType
  | FetchListsSuccessActionType
  | FetchListsFailureActionType
  | FetchListAnimesRequestActionType
  | FetchListAnimesSuccessActionType
  | FetchListAnimesEmptyActionType
  | FetchListAnimesFailureActionType
