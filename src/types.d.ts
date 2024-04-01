export type FetchedDBType = {
  title_english: string
  title: string
  mal_id: number
  genres: { name: string; mal_id: number }[]
  images: { jpg: { image_url: string } }
  rating: string
}

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
}

export type AnimeActionType = {
  type: 'UPDATE_ANIME_LIST'
  payload: CardDataType[]
}

export type ActionType = AnimeActionType

export type DispatchType = (args: ActionType) => ActionType
