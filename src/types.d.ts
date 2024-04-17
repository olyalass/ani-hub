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
  isLoadingAnime: boolean
  isLoadingGenres: boolean
  isAnimeError: boolean
  isGenresError: boolean
}

type GenreType = { label: string; key: number }

type filtersType = {
  rating: string[]
  genres: string[]
}

export type filterCategory = 'rating' | 'genres'

type fetchAnimeRequestActionType = {
  type: typeof actionTypes.FETCH_ANIME_REQUEST
}

type fetchAnimeSuccessActionType = {
  type: typeof actionTypes.FETCH_ANIME_SUCCESS
  payload: CardDataType[]
}

type fetchAnimeFailureActionType = {
  type: typeof actionTypes.FETCH_ANIME_FAILURE
}

type fetchGenresRequestActionType = {
  type: typeof actionTypes.FETCH_GENRES_REQUEST
}

type fetchGenresSuccessActionType = {
  type: typeof actionTypes.FETCH_GENRES_SUCCESS
  payload: GenreType[]
}

type fetchGenresFailureActionType = {
  type: typeof actionTypes.FETCH_GENRES_FAILURE
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
  | fetchAnimeRequestActionType
  | fetchAnimeSuccessActionType
  | fetchAnimeFailureActionType
  | fetchGenresRequestActionType
  | fetchGenresSuccessActionType
  | fetchGenresFailureActionType
  | MonoGenreActionType
  | MonoRatingActionType
  | ClearFiltersActionType

// export type DispatchType = (args: ActionType) => ActionType
export type DispatchType = Dispatch<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ActionType | ThunkAction<any, any, any, any>
>
