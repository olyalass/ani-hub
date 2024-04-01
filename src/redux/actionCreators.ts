import { AnimeCardType, AnimeActionType } from '../types'
import * as actionTypes from './actionTypes'

export function updateAnimeList(animeData: AnimeCardType[]) {
  const action: AnimeActionType = {
    type: actionTypes.UPDATE_ANIME_LIST,
    payload: animeData,
  }
  return action
}
