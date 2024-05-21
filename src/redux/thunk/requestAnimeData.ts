import { Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'

import {
  fetchAnimeEmpty,
  fetchAnimeFailure,
  fetchAnimeRequest,
  fetchAnimeSuccess,
  setTotalPages,
} from '../actionCreators'
import getAnimeData from '../../api/requests/getAnimeData'
import getDupesReplacement from '../../api/requests/getDupesReplacement'
import parseAnimeResponseItem from '../../api/parsers/parseAnimeResponseItem'
import { StateType, ActionType } from '../../types'

function requestAnimeData(
  url: string,
  page: number = 1,
  itemsPerPage: number = 1,
): ThunkAction<void, StateType, unknown, ActionType> {
  return async (dispatch: Dispatch) => {
    dispatch(fetchAnimeRequest())
    try {
      const animeResponseResult = await getAnimeData(url)
      if (!animeResponseResult.data[0]) {
        dispatch(fetchAnimeEmpty())
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
          )
        } else {
          uniqueAnimeData = animeData
        }
        const parsedAnimeData = uniqueAnimeData.map(parseAnimeResponseItem)
        dispatch(fetchAnimeSuccess(parsedAnimeData))
        dispatch(setTotalPages(totalPages))
      }
    } catch {
      dispatch(fetchAnimeFailure())
    }
  }
}

export default requestAnimeData
