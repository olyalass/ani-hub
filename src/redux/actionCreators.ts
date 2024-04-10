import {
  AnimeCardType,
  ClearFiltersActionType,
  GenreType,
  MonoGenreActionType,
  MonoRatingActionType,
} from '../types'
import * as actionTypes from './actionTypes'

export function updateAnimeList(animeData: AnimeCardType[]) {
  const action = {
    type: actionTypes.UPDATE_ANIME_LIST,
    payload: animeData,
  }
  return action
}

export const setMonoRating = (rating: string): MonoRatingActionType => ({
  type: actionTypes.SET_MONO_RATING,
  payload: { rating: [rating], genres: [] },
})

export const setMonoGenre = (genre: string): MonoGenreActionType => ({
  type: actionTypes.SET_MONO_GENRE,
  payload: { rating: [], genres: [genre] },
})

export function clearFilters() {
  const action: ClearFiltersActionType = {
    type: actionTypes.CLEAR_FILTERS,
  }
  return action
}

export function updateGenresList(genres: GenreType[]) {
  const action = {
    type: actionTypes.UPDATE_GENRES_LIST,
    payload: genres,
  }
  return action
}
