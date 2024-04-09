import {
  AnimeCardType,
  ClearFiltersActionType,
  filterCategory,
  GenreType,
  MonoFilterActionType,
} from '../types'
import * as actionTypes from './actionTypes'

export function updateAnimeList(animeData: AnimeCardType[]) {
  const action = {
    type: actionTypes.UPDATE_ANIME_LIST,
    payload: animeData,
  }
  return action
}

export function setMonoFilter(filter: string, filterType: filterCategory) {
  const action: MonoFilterActionType = {
    type: actionTypes.SET_MONO_FILTER,
    payload: { rating: [], genres: [] },
  }
  if (filterType === 'genres') {
    action.payload = { rating: [], genres: [filter] }
  } else if (filterType === 'rating') {
    action.payload = { rating: [filter], genres: [] }
  }
  return action
}

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
