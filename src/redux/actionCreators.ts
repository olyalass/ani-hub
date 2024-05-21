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
  SetQToMultiFiltersActionType,
  SetTotalPagesActionType,
  ClearTotalPagesActionType,
  FormObjType,
  SetMultiFiltersActionType,
  ClearMultiFilterActionType,
  FetchAnimeEmptyActionType,
  SetGenreToMultiFiltersActionType,
} from '../types'
import * as actionTypes from './actionTypes'

export const setMonoRating = (rating: string): MonoRatingActionType => ({
  type: actionTypes.SET_MONO_RATING,
  payload: { rating: rating, genre: null },
})

export const setMonoGenre = (genre: string): MonoGenreActionType => ({
  type: actionTypes.SET_MONO_GENRE,
  payload: { rating: null, genre: genre },
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

export const setQToMultiFilters = (
  value: string,
): SetQToMultiFiltersActionType => {
  return {
    type: actionTypes.SET_Q_TO_MULTI_FILTERS,
    payload: value,
  }
}

export const setTotalPages = (total: number): SetTotalPagesActionType => {
  return {
    type: actionTypes.SET_TOTAL_PAGES,
    payload: total,
  }
}

export const clearTotalPages = (): ClearTotalPagesActionType => {
  return {
    type: actionTypes.CLEAR_TOTAL_PAGES,
  }
}

export const setMultiFilters = (
  searchFormData: FormObjType,
): SetMultiFiltersActionType => {
  return {
    type: actionTypes.SET_MULTI_FILTERS,
    payload: searchFormData,
  }
}

export const clearMultiFilters = (): ClearMultiFilterActionType => {
  return {
    type: actionTypes.CLEAR_MULTI_FILTERS,
  }
}

export const setGenreToMultiFilters = (
  genre: string,
): SetGenreToMultiFiltersActionType => {
  return {
    type: actionTypes.SET_GENRE_TO_MULTI_FILTERS,
    payload: genre,
  }
}
