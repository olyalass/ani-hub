import { AnimePageDataType } from '../../../../types'
import * as actionTypes from './actionTypes'

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

export type PageActionType =
  | FetchAnimePageRequestActionType
  | FetchAnimePageSuccessActionType
  | FetchAnimePageFailureActionType
  | FetchAnimePageEmptyActionType
