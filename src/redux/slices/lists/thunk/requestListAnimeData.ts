import { Dispatch } from 'redux'
import {
  fetchListAnimesEmpty,
  fetchListAnimesFailure,
  fetchListAnimesRequest,
  fetchListAnimesSuccess,
} from '../actions/actionCreators'
import {
  AnimeCardType,
  AnimeBaseResponseType,
  StateType,
} from '../../../../types'
import { createGetIdAnimeUrl } from '../../../../utils'
import { getAnimePageData, parseAnimeResponseItem } from '../../../../api'
import { ThunkAction } from 'redux-thunk'
import { ListsActionType } from '../actions/actions'

function requestListAnimeData(
  animeIds: number[],
): ThunkAction<void, StateType, unknown, ListsActionType> {
  return async (dispatch: Dispatch) => {
    dispatch(fetchListAnimesRequest())
    if (animeIds.length) {
      try {
        const listAnimeData: AnimeCardType[] = []
        for (const id of animeIds) {
          const url = createGetIdAnimeUrl(id)
          const responsePageData: AnimeBaseResponseType | null =
            await getAnimePageData(url)
          if (responsePageData) {
            const parsedPageData = parseAnimeResponseItem(responsePageData)
            listAnimeData.push(parsedPageData)
          }
        }
        dispatch(fetchListAnimesSuccess(listAnimeData))
      } catch {
        dispatch(fetchListAnimesFailure())
      }
    } else {
      dispatch(fetchListAnimesEmpty())
    }
  }
}

export default requestListAnimeData
