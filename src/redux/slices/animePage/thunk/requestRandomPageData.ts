import { Dispatch } from 'redux'

import {
  parseAnimePageResponse,
  getAnimeData,
  getAnimePageData,
} from '../../../../api'
import { AnimeBaseResponseType } from '../../../../types'
import {
  fetchAnimePageEmpty,
  fetchAnimePageFailure,
  fetchAnimePageRequest,
  fetchAnimePageSuccess,
} from '../actions/actionCreators'
import { createGetIdAnimeUrl, createGetTopAnimeUrl } from '../../../../utils'

function requestRandomPageData() {
  const makeRequest = async (dispatch: Dispatch) => {
    dispatch(fetchAnimePageRequest())
    try {
      const url = createGetTopAnimeUrl()
      const response = await fetch(url)
      const data: {
        pagination: { last_visible_page: number }
        data: AnimeBaseResponseType[]
      } = await response.json()
      const totalAnimes = data.pagination.last_visible_page
      const randomPage = Math.floor(Math.random() * totalAnimes)
      const newUrl = url + '&page=' + randomPage
      const responseData = await getAnimeData(newUrl)
      if (!responseData) {
        dispatch(fetchAnimePageEmpty())
      } else {
        const responsePageArray = responseData.data
        const responsePage = await getAnimePageData(
          createGetIdAnimeUrl(responsePageArray[0].mal_id),
        )
        if (responsePage) {
          const parsedPageData = parseAnimePageResponse(responsePage)
          dispatch(fetchAnimePageSuccess(parsedPageData))
        }
      }
    } catch {
      dispatch(fetchAnimePageFailure())
    }
  }
  return makeRequest
}

export default requestRandomPageData
