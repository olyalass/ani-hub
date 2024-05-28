import * as actionTypes from '../actionTypes'
import {
  FetchAnimeRequestActionType,
  FetchAnimeSuccessActionType,
  FetchAnimeFailureActionType,
  FetchAnimeEmptyActionType,
  FetchGenresRequestActionType,
  FetchGenresSuccessActionType,
  FetchGenresFailureActionType,
  FetchAnimePageRequestActionType,
  FetchAnimePageSuccessActionType,
  FetchAnimePageFailureActionType,
  FetchAnimePageEmptyActionType,
} from '../actions'
import { AnimeCardType, GenreType, AnimePageDataType } from '../../types'

export const fetchAnimeRequest = (): FetchAnimeRequestActionType => {
  return {
    type: actionTypes.FETCH_ANIME_REQUEST,
  }
}

export const fetchAnimeSuccess = (
  data: AnimeCardType[],
  totalPages: number,
): FetchAnimeSuccessActionType => {
  return {
    type: actionTypes.FETCH_ANIME_SUCCESS,
    payload: { data, totalPages },
  }
}

export const fetchAnimeFailure = (): FetchAnimeFailureActionType => {
  return {
    type: actionTypes.FETCH_ANIME_FAILURE,
  }
}

export const fetchAnimeEmpty = (): FetchAnimeEmptyActionType => {
  return {
    type: actionTypes.FETCH_ANIME_EMPTY,
  }
}

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
