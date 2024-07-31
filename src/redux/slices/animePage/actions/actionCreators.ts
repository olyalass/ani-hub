import { AnimePageDataType } from '../../../../types'
import {
  FetchAnimePageEmptyActionType,
  FetchAnimePageFailureActionType,
  FetchAnimePageRequestActionType,
  FetchAnimePageSuccessActionType,
} from './actions'
import * as actionTypes from './actionTypes'

export const fetchAnimePageRequest = (): FetchAnimePageRequestActionType => {
  return {
    type: actionTypes.FETCH_ANIME_PAGE_REQUEST,
  }
}

export const fetchAnimePageSuccess = (
  data: AnimePageDataType,
): FetchAnimePageSuccessActionType => {
  return {
    type: actionTypes.FETCH_ANIME_PAGE_SUCCESS,
    payload: data,
  }
}

export const fetchAnimePageFailure = (): FetchAnimePageFailureActionType => {
  return {
    type: actionTypes.FETCH_ANIME_PAGE_FAILURE,
  }
}

export const fetchAnimePageEmpty = (): FetchAnimePageEmptyActionType => {
  return {
    type: actionTypes.FETCH_ANIME_PAGE_EMPTY,
  }
}
