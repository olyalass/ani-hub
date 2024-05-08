import { Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'
import {
  fetchAnimeFailure,
  fetchAnimeRequest,
  fetchAnimeSuccess,
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
      const animeData = await getAnimeData(url)
      const uniqueAnimeData = await getDupesReplacement(
        animeData,
        url,
        page,
        itemsPerPage,
      )
      const parsedAnimeData = uniqueAnimeData.map(parseAnimeResponseItem)
      dispatch(fetchAnimeSuccess(parsedAnimeData))
    } catch {
      dispatch(fetchAnimeFailure())
    }
  }
}

export default requestAnimeData
