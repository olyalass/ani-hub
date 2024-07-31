import { ThunkAction } from 'redux-thunk'

import { SearchCardsStateType } from '../../../../types'
import { createAdvancedSearchAnimeUrl } from '../../../../utils'
import requestCardsData from '../../../thunk/requestCardsData'
import {
  fetchSearchCardsDataEmpty,
  fetchSearchCardsDataFailure,
  fetchSearchCardsDataRequest,
  fetchSearchCardsDataSuccess,
} from '../actions/actionCreators'
import { SearchCardsActionType } from '../actions/actions'

function requestSearchCardsData(
  cardsPerPage: number,
  page?: number,
  urlFilterData?: string,
): ThunkAction<void, SearchCardsStateType, unknown, SearchCardsActionType> {
  const url = createAdvancedSearchAnimeUrl(cardsPerPage, urlFilterData)
  return requestCardsData(
    url,
    page,
    cardsPerPage,
    fetchSearchCardsDataRequest,
    fetchSearchCardsDataSuccess,
    fetchSearchCardsDataFailure,
    fetchSearchCardsDataEmpty,
  )
}

export default requestSearchCardsData
