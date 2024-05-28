import { Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'

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
  animeList: CardDataType[] | null
  currPage: number
  monoFilter: MonoFiltersType
  genres: GenreType[]
  multiFilters: SearchFormDataType
  animePageData: AnimePageDataType | null
  isLoadingAnime: boolean
  isLoadingGenres: boolean
  isLoadingAnimePage: boolean
  isAnimeError: boolean
  isGenresError: boolean
  isAnimePageError: boolean
  isAnimeListEmpty: boolean
  isEmptyPage: boolean
  q: string | null
  totalPages: number
}

type FormObjType = {
  order_by: string
  isAscending: boolean
  q: null | string
  rating: null | string
  genres: string[]
  genres_exclude: string[]
  status: null | string
}

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
