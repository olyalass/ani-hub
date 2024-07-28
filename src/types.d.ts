import { Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'

export type AnimeBaseResponseType = {
  title_english: string
  title: string
  mal_id: number
  genres: { name: string; mal_id: number }[]
  images: { jpg: { large_image_url: string } }
  rating: string
  year: number
  status: string
  episodes: number
  studios: [{ mal_id: number; name: string }]
  score: number
  synopsis: string
  trailer: { url: string }
  themes: { name: string }[]
  theme: { endings: string[]; openings: string[] }
  relations: {
    relation: string
    entry: { mal_id: number; type: string; name: string }[]
  }[]
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
  studios: string[]
  score: number
  id: number
  synopsis: string
  trailer: string | null
  themes: string[]
  music: { openings: string[]; endings: string[] }
  related: { relation: string; entry: { id: number; title: string }[] }[]
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
  animeCardsData: CardDataType[] | null
  currPage: number
  genres: GenreType[]
  filters: FiltersType
  animePageData: AnimePageDataType | null
  isLoadingCards: boolean
  isLoadingGenres: boolean
  isLoadingAnimePage: boolean
  isCardsError: boolean
  isGenresError: boolean
  isAnimePageError: boolean
  isCardsDataEmpty: boolean
  isEmptyPage: boolean
  totalPages: number
  lists: ListsType
  currList: string | null
  currListAnimeCards: AnimeCardType[]
  isListAnimeLoading: boolean
  isListAnimeError: boolean
  isPostingLists: boolean
  isPostingError: boolean
  isListsLoading: boolean
  isListsError: boolean
}

export interface HomeCardsStateType {
  data: CardDataType[] | null
  isLoading: boolean
  isError: boolean
  isEmpty: boolean
  currPage: number
  totalPages: number
  filters: HomeFiltersType
}

export interface SearchCardsStateType {
  data: CardDataType[] | null
  isLoading: boolean
  isError: boolean
  isEmpty: boolean
  currPage: number
  totalPages: number
}

export type CardsStateType = HomeCardsStateType | SearchCardsStateType

export interface GenresStateType {
  genres: GenreType[]
  isLoading: boolean
  isError: boolean
}

export interface PageStateType {
  data: AnimePageDataType | null
  isLoading: boolean
  isError: boolean
  isEmpty: boolean
}

export interface FilterStateType {
  filters: FiltersType
}

export interface ListsStateType {
  lists: ListsType
  currListAnimeCards: AnimeCardType[]
  isCardsDataLoading: boolean
  isCardsDataError: boolean
  isCardsDataEmpty: boolean
  isPostingLists: boolean
  isPostingError: boolean
  isListsLoading: boolean
  isListsError: boolean
}

export type ListsType = { [key: string]: number[] }

type FiltersType = {
  order_by: string
  isAscending: boolean
  searchword: null | string | undefined
  rating: null | string
  genres: string[]
  genres_exclude: string[]
  status: null | string
}

type HomeFiltersType =
  | { rating: null; genre: string }
  | { rating: string; genre: null }
  | { rating: null; genre: null }

type DataFormType = {
  touched: boolean
  name: string[]
  value: string
}

type GenreType = { label: string; key: number }

type MonoFiltersType = {
  rating: string | null
  genre: string | null
}

export type filterCategory = 'rating' | 'genres'

export type DispatchType = Dispatch<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ActionType | ThunkAction<any, any, any, any>
>
