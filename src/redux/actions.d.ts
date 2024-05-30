import * as actionTypes from './actionTypes'
import {
  CardDataType,
  GenreType,
  AnimePageDataType,
  MonoFiltersType,
  FormObjType,
} from '../types'

type FetchAnimeRequestActionType = {
  type: typeof actionTypes.FETCH_ANIME_REQUEST
}

type FetchAnimeSuccessActionType = {
  type: typeof actionTypes.FETCH_ANIME_SUCCESS
  payload: { data: CardDataType[]; totalPages: number }
}

type FetchAnimeFailureActionType = {
  type: typeof actionTypes.FETCH_ANIME_FAILURE
}

type FetchAnimeEmptyActionType = {
  type: typeof actionTypes.FETCH_ANIME_EMPTY
}

type FetchGenresRequestActionType = {
  type: typeof actionTypes.FETCH_GENRES_REQUEST
}

type FetchGenresSuccessActionType = {
  type: typeof actionTypes.FETCH_GENRES_SUCCESS
  payload: GenreType[]
}

type FetchGenresFailureActionType = {
  type: typeof actionTypes.FETCH_GENRES_FAILURE
}

type FetchAnimePageRequestActionType = {
  type: typeof actionTypes.FETCH_ANIME_PAGE_REQUEST
}

type FetchAnimePageSuccessActionType = {
  type: typeof actionTypes.FETCH_ANIME_PAGE_SUCCESS
  payload: AnimePageDataType
}

type FetchAnimePageFailureActionType = {
  type: typeof actionTypes.FETCH_ANIME_PAGE_FAILURE
}

type FetchAnimePageEmptyActionType = {
  type: typeof actionTypes.FETCH_ANIME_PAGE_EMPTY
}

type MonoGenreActionType = {
  type: typeof actionTypes.SET_MONO_GENRE
  payload: MonoFiltersType
}

type MonoRatingActionType = {
  type: typeof actionTypes.SET_MONO_RATING
  payload: MonoFiltersType
}

type ClearFiltersActionType = {
  type: typeof actionTypes.CLEAR_FILTERS
}

type SetQToMultiFiltersActionType = {
  type: typeof actionTypes.SET_Q_TO_MULTI_FILTERS
  payload: string
}

type SetTotalPagesActionType = {
  type: typeof actionTypes.SET_TOTAL_PAGES
  payload: number
}

type ClearTotalPagesActionType = {
  type: typeof actionTypes.CLEAR_TOTAL_PAGES
}

type SetMultiFiltersActionType = {
  type: typeof actionTypes.SET_MULTI_FILTERS
  payload: FormObjType
}

type ClearMultiFilterActionType = {
  type: typeof actionTypes.CLEAR_MULTI_FILTERS
}

type SetGenreToMultiFiltersActionType = {
  type: typeof actionTypes.SET_GENRE_TO_MULTI_FILTERS
  payload: string
}

export type ActionType =
  | FetchAnimeRequestActionType
  | FetchAnimeSuccessActionType
  | FetchAnimeFailureActionType
  | FetchAnimeEmptyActionType
  | FetchGenresRequestActionType
  | FetchGenresSuccessActionType
  | FetchGenresFailureActionType
  | FetchAnimePageRequestActionType
  | FetchAnimePageSuccessActionType
  | FetchAnimePageFailureActionType
  | FetchAnimePageEmptyActionType
  | MonoGenreActionType
  | MonoRatingActionType
  | ClearFiltersActionType
  | SetQToMultiFiltersActionType
  | SetTotalPagesActionType
  | ClearTotalPagesActionType
  | SetMultiFiltersActionType
  | ClearMultiFiltersActionType
  | SetGenreToMultiFiltersActionType
