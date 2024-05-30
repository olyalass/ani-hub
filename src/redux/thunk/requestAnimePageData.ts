import { Dispatch } from 'redux'

import { parseAnimePageResponse, getAnimePageData } from '../../api'
import { AnimeBaseResponseType } from '../../types'
import {
  fetchAnimePageEmpty,
  fetchAnimePageFailure,
  fetchAnimePageRequest,
  fetchAnimePageSuccess,
} from '../thunk/thunkActionCreators'

function requestAnimePageData(url: string) {
  return async (dispatch: Dispatch) => {
    dispatch(fetchAnimePageRequest())
    try {
      const responsePageData: AnimeBaseResponseType | null =
        await getAnimePageData(url)
      if (!responsePageData) {
        dispatch(fetchAnimePageEmpty())
      } else {
        const parsedPageData = parseAnimePageResponse(responsePageData)
        dispatch(fetchAnimePageSuccess(parsedPageData))
      }
    } catch {
      dispatch(fetchAnimePageFailure())
    }
  }
}

export default requestAnimePageData
