import {
  AnimeCardType,
  ClearFiltersActionType,
  MonoGenreActionType,
  MonoRatingActionType,
  FetchAnimeSuccessActionType,
  FetchAnimeFailureActionType,
  FetchAnimeRequestActionType,
  FetchGenresRequestActionType,
  FetchGenresSuccessActionType,
  FetchGenresFailureActionType,
  GenreType,
  AnimePageDataType,
  FetchAnimePageRequestActionType,
  FetchAnimePageSuccessActionType,
  FetchAnimePageFailureActionType,
  FetchAnimePageEmptyActionType,
} from '../types'
import * as actionTypes from './actionTypes'

export const setMonoRating = (rating: string): MonoRatingActionType => ({
  type: actionTypes.SET_MONO_RATING,
  payload: { rating: [rating], genres: [] },
})

export const setMonoGenre = (genre: string): MonoGenreActionType => ({
  type: actionTypes.SET_MONO_GENRE,
  payload: { rating: [], genres: [genre] },
})

export const clearFilters = (): ClearFiltersActionType => ({
  type: actionTypes.CLEAR_FILTERS,
})

export const fetchAnimeRequest = (): FetchAnimeRequestActionType => {
  return {
    type: actionTypes.FETCH_ANIME_REQUEST,
  }
}

export const fetchAnimeSuccess = (
  data: AnimeCardType[],
): FetchAnimeSuccessActionType => {
  return {
    type: actionTypes.FETCH_ANIME_SUCCESS,
    payload: data,
  }
}

export const fetchAnimeFailure = (): FetchAnimeFailureActionType => {
  return {
    type: actionTypes.FETCH_ANIME_FAILURE,
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
