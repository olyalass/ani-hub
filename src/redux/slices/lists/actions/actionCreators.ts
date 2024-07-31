import { AnimeCardType, ListsType } from '../../../../types'
import {
  DeleteItemFromListFailureActionType,
  DeleteItemFromListRequestActionType,
  DeleteItemFromListSuccessActionType,
  DeleteListFailureActionType,
  DeleteListRequestActionType,
  DeleteListSuccessActionType,
  FetchListAnimesEmptyActionType,
  FetchListAnimesFailureActionType,
  FetchListAnimesRequestActionType,
  FetchListAnimesSuccessActionType,
  FetchListsFailureActionType,
  FetchListsRequestActionType,
  FetchListsSuccessActionType,
  PostNewItemToListFailureActionType,
  PostNewItemToListRequestActionType,
  PostNewItemToListSuccessActionType,
  PostNewListFailureActionType,
  PostNewListRequestActionType,
  PostNewListSuccessActionType,
} from './actions'
import * as actionTypes from './actionTypes'

export const fetchListAnimesRequest = (): FetchListAnimesRequestActionType => {
  return {
    type: actionTypes.FETCH_LIST_ANIMES_REQUEST,
  }
}

export const fetchListAnimesSuccess = (
  data: AnimeCardType[],
): FetchListAnimesSuccessActionType => {
  return {
    type: actionTypes.FETCH_LIST_ANIMES_SUCCESS,
    payload: data,
  }
}

export const fetchListAnimesEmpty = (): FetchListAnimesEmptyActionType => {
  return {
    type: actionTypes.FETCH_LIST_ANIMES_EMPTY,
  }
}

export const fetchListAnimesFailure = (): FetchListAnimesFailureActionType => {
  return {
    type: actionTypes.FETCH_LIST_ANIMES_FAILURE,
  }
}

export const postNewListRequest = (): PostNewListRequestActionType => {
  return {
    type: actionTypes.POST_NEW_LIST_REQUEST,
  }
}

export const postNewListSuccess = (
  listName: string,
  value: number[],
): PostNewListSuccessActionType => {
  return {
    type: actionTypes.POST_NEW_LIST_SUCCESS,
    payload: { listName, value },
  }
}

export const postNewListFailure = (): PostNewListFailureActionType => {
  return {
    type: actionTypes.POST_NEW_LIST_FAILURE,
  }
}

export const postNewItemToListRequest =
  (): PostNewItemToListRequestActionType => {
    return {
      type: actionTypes.POST_NEW_ITEM_TO_LIST_REQUEST,
    }
  }

export const postNewItemToListSuccess = (
  listName: string,
  newId: number,
): PostNewItemToListSuccessActionType => {
  return {
    type: actionTypes.POST_NEW_ITEM_TO_LIST_SUCCESS,
    payload: { listName, newId },
  }
}

export const postNewItemToListFailure =
  (): PostNewItemToListFailureActionType => {
    return {
      type: actionTypes.POST_NEW_ITEM_TO_LIST_FAILURE,
    }
  }

export const fetchListsRequest = (): FetchListsRequestActionType => {
  return {
    type: actionTypes.FETCH_LISTS_REQUEST,
  }
}

export const fetchListsSuccess = (
  lists: ListsType,
): FetchListsSuccessActionType => {
  return {
    type: actionTypes.FETCH_LISTS_SUCCESS,
    payload: lists,
  }
}

export const fetchListsFailure = (): FetchListsFailureActionType => {
  return {
    type: actionTypes.FETCH_LISTS_FAILURE,
  }
}

export const deleteListRequest = (): DeleteListRequestActionType => {
  return {
    type: actionTypes.DELETE_LIST_REQUEST,
  }
}

export const deleteListSuccess = (
  listName: string,
): DeleteListSuccessActionType => {
  return {
    type: actionTypes.DELETE_LIST_SUCCESS,
    payload: listName,
  }
}

export const deleteListFailure = (): DeleteListFailureActionType => {
  return {
    type: actionTypes.DELETE_LIST_FAILURE,
  }
}

export const deleteItemFromListRequest =
  (): DeleteItemFromListRequestActionType => {
    return {
      type: actionTypes.DELETE_ITEM_FROM_LIST_REQUEST,
    }
  }

export const deleteItemFromListSuccess = (
  listName: string,
  animeId: number,
): DeleteItemFromListSuccessActionType => {
  return {
    type: actionTypes.DELETE_ITEM_FROM_LIST_SUCCESS,
    payload: { listName, animeId },
  }
}

export const deleteItemFromListFailure =
  (): DeleteItemFromListFailureActionType => {
    return {
      type: actionTypes.DELETE_ITEM_FROM_LIST_FAILURE,
    }
  }
