import {
  AnimeCardType,
  ClearFiltersActionType,
  GenreType,
  MonoGenreActionType,
  MonoRatingActionType,
  UpdateAnimeActionType,
  UpdateGenresActionType,
} from '../types'
import * as actionTypes from './actionTypes'

export const updateAnimeList = (
  animeData: AnimeCardType[],
): UpdateAnimeActionType => ({
  type: actionTypes.UPDATE_ANIME_LIST,
  payload: animeData,
})

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

export const updateGenresList = (
  genres: GenreType[],
): UpdateGenresActionType => ({
  type: actionTypes.UPDATE_GENRES_LIST,
  payload: genres,
})
