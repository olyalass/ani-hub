import * as actionTypes from './redux/actionTypes'

export type AnimeBaseResponseType = {
  title_english: string
  title: string
  mal_id: number
  genres: { name: string; mal_id: number }[]
  images: { jpg: { image_url: string } }
  rating: string
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
}

type GenreType = { label: string; key: number }

type filtersType = {
  rating: string[]
  genres: string[]
}

export type filterCategory = 'rating' | 'genres'

type UpdateAnimeActionType = {
  type: typeof actionTypes.UPDATE_ANIME_LIST
  payload: CardDataType[]
}

type MonoGenreActionType = {
  type: typeof actionTypes.SET_MONO_GENRE
  payload: filtersType
}

type MonoRatingActionType = {
  type: typeof actionTypes.SET_MONO_RATING
  payload: filtersType
}

type UpdateGenresActionType = {
  type: typeof actionTypes.UPDATE_GENRES_LIST
  payload: GenreType[]
}

type ClearFiltersActionType = {
  type: typeof actionTypes.CLEAR_FILTERS
}

export type ActionType =
  | UpdateAnimeActionType
  | MonoGenreActionType
  | MonoRatingActionType
  | UpdateGenresActionType
  | ClearFiltersActionType

export type DispatchType = (args: ActionType) => ActionType
