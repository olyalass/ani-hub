import { Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'

import * as actionTypes from './redux/actionTypes'

export type AnimeBaseResponseType = {
  title_english: string
  title: string
  mal_id: number
  genres: { name: string; mal_id: number }[]
  images: { jpg: { image_url: string } }
  rating: string
  year: number
  status: string
  episodes: number
  producers: [{ mal_id: number; name: string }]
  score: number
  synopsis: string
}

export type AnimePageDataType = {
  cardTitle: string
  japTitle: string
  year: number
  rating: string
  genres: GenreType[]
  episodes: number
  img: string
  status: string
  producers: string[]
  score: number
  id: number
  synopsis: string
}

export type RatingType = {
  key: string
  label: string
  color: string
  darkcolor: string
  shortlabel: string
}

export type GenresBaseResponseType = { name: string; mal_id: number }

export type AnimeCardType = {
  titleEnglish: string
  titleOrig: string
  id: number
  genres: { name: string; id: number }[]
  img: string
  rating: string
}

export type StateType = {
  animeList: CardDataType[]
  currPage: number
  filters: filtersType
  genres: GenreType[]
  animePageData: AnimePageData
  isLoadingAnime: boolean
  isLoadingGenres: boolean
  isLoadingAnimePage: boolean
  isAnimeError: boolean
  isGenresError: boolean
  isAnimePageError: boolean
  isEmptyPage: boolean
}

type GenreType = { label: string; key: number }

type FiltersType = {
  rating: string[]
  genres: string[]
}

export type filterCategory = 'rating' | 'genres'

type FetchAnimeRequestActionType = {
  type: typeof actionTypes.FETCH_ANIME_REQUEST
}

type FetchAnimeSuccessActionType = {
  type: typeof actionTypes.FETCH_ANIME_SUCCESS
  payload: CardDataType[]
}

type FetchAnimeFailureActionType = {
  type: typeof actionTypes.FETCH_ANIME_FAILURE
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
  payload: AnimePageData
}

type FetchAnimePageFailureActionType = {
  type: typeof actionTypes.FETCH_ANIME_PAGE_FAILURE
}

type FetchAnimePageEmptyActionType = {
  type: typeof actionTypes.FETCH_ANIME_PAGE_EMPTY
}

type MonoGenreActionType = {
  type: typeof actionTypes.SET_MONO_GENRE
  payload: filtersType
}

type MonoRatingActionType = {
  type: typeof actionTypes.SET_MONO_RATING
  payload: filtersType
}

type ClearFiltersActionType = {
  type: typeof actionTypes.CLEAR_FILTERS
}

export type ActionType =
  | FetchAnimeRequestActionType
  | FetchAnimeSuccessActionType
  | FetchAnimeFailureActionType
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

export type DispatchType = Dispatch<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ActionType | ThunkAction<any, any, any, any>
>
