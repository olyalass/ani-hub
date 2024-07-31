import { Action, Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'

import {
  getAnimeData,
  getDupesReplacement,
  parseAnimeResponseItem,
} from '../../api'
import { AnimeCardType, CardsStateType } from '../../types'
import { ActionType } from '../actions'

function requestCardsData(
  url: string,
  page: number = 1,
  itemsPerPage: number = 1,
  thunkRequest: () => Action,
  thunkSuccess: (data: AnimeCardType[], totalPages: number) => Action,
  thunkFailure: () => Action,
  thunkEmpty: () => Action,
): ThunkAction<void, CardsStateType, unknown, ActionType> {
  return async (dispatch: Dispatch) => {
    dispatch(thunkRequest())
    try {
      const animeResponseResult = await getAnimeData(url)
      if (!animeResponseResult.data[0]) {
        dispatch(thunkEmpty())
      } else {
        const animeData = animeResponseResult.data
        const totalPages = animeResponseResult.totalPages
        let uniqueAnimeData = []
        if (animeResponseResult.isFiltered && totalPages > page) {
          uniqueAnimeData = await getDupesReplacement(
            animeData,
            url,
            page,
            itemsPerPage,
            totalPages,
          )
        } else {
          uniqueAnimeData = animeData
        }
        const parsedAnimeData = uniqueAnimeData.map(parseAnimeResponseItem)
        dispatch(thunkSuccess(parsedAnimeData, totalPages))
      }
    } catch {
      dispatch(thunkFailure())
    }
  }
}

export default requestCardsData
