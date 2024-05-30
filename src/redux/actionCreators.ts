import { FormObjType } from '../types'
import {
  ClearFiltersActionType,
  MonoGenreActionType,
  MonoRatingActionType,
  SetQToMultiFiltersActionType,
  SetMultiFiltersActionType,
  ClearMultiFilterActionType,
  SetGenreToMultiFiltersActionType,
} from './actions'
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

export const setQToMultiFilters = (
  value: string,
): SetQToMultiFiltersActionType => {
  return {
    type: actionTypes.SET_Q_TO_MULTI_FILTERS,
    payload: value,
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
