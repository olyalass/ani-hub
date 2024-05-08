import { Dispatch } from 'redux'
import parseAnimePageResponse from '../../api/parsers/parseAnimePageResponse'
import { AnimeBaseResponseType } from '../../types'
import {
  fetchAnimePageFailure,
  fetchAnimePageRequest,
  fetchAnimePageSuccess,
} from '../actionCreators'
import getAnimeData from '../../api/requests/getAnimeData'
import getUrl from '../../utils/getUrl'

function requestRandomPageData() {
  const makeRequest = async (dispatch: Dispatch) => {
    dispatch(fetchAnimePageRequest())
    try {
      const url = getUrl('top')
      const response = await fetch(url)
      const data: {
        pagination: { last_visible_page: number }
        data: AnimeBaseResponseType[]
      } = await response.json()
      const totalAnimes = data.pagination.last_visible_page
      const randomPage = Math.floor(Math.random() * totalAnimes)
      const newUrl = url + '&page=' + randomPage
      const responsePageArray = await getAnimeData(newUrl)
      const parsedPageData = parseAnimePageResponse(responsePageArray[0])
      dispatch(fetchAnimePageSuccess(parsedPageData))
    } catch {
      dispatch(fetchAnimePageFailure())
    }
  }
  return makeRequest
}

export default requestRandomPageData
