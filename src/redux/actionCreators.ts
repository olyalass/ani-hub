import {
  AnimeCardType,
  ClearFiltersActionType,
  MonoGenreActionType,
  MonoRatingActionType,
  fetchAnimeSuccessActionType,
  fetchAnimeFailureActionType,
  fetchAnimeRequestActionType,
  fetchGenresRequestActionType,
  fetchGenresSuccessActionType,
  GenreType,
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

export const fetchAnimeRequest = (): fetchAnimeRequestActionType => {
  return {
    type: actionTypes.FETCH_ANIME_REQUEST,
  }
}

export const fetchAnimeSuccess = (
  data: AnimeCardType[],
): fetchAnimeSuccessActionType => {
  return {
    type: actionTypes.FETCH_ANIME_SUCCESS,
    payload: data,
  }
}

export const fetchAnimeFailure = (): fetchAnimeFailureActionType => {
  return {
    type: actionTypes.FETCH_ANIME_FAILURE,
  }
}

export const fetchGenresRequest = (): fetchGenresRequestActionType => {
  return {
    type: actionTypes.FETCH_GENRES_REQUEST,
  }
}

export const fetchGenresSuccess = (
  data: GenreType[],
): fetchGenresSuccessActionType => {
  return {
    type: actionTypes.FETCH_GENRES_SUCCESS,
    payload: data,
  }
}

export const fetchGenresFailure = () => {
  return {
    type: actionTypes.FETCH_GENRES_FAILURE,
  }
}
