import { ThunkAction } from 'redux-thunk'

import { HomeCardsStateType, HomeFiltersType } from '../../../../types'
import { ActionType } from '../../../actions'
import {
  fetchHomeCardsDataEmpty,
  fetchHomeCardsDataFailure,
  fetchHomeCardsDataRequest,
  fetchHomeCardsDataSuccess,
} from '../actions/actionCreators'
import { createGetTopAnimeUrl } from '../../../../utils'
import requestCardsData from '../../../thunk/requestCardsData'

function requestHomeCardsData(
  filters: HomeFiltersType,
  page: number = 1,
  itemsPerPage: number = 1,
): ThunkAction<void, HomeCardsStateType, unknown, ActionType> {
  const url = createGetTopAnimeUrl(filters, itemsPerPage, page)
  return requestCardsData(
    url,
    page,
    itemsPerPage,
    fetchHomeCardsDataRequest,
    fetchHomeCardsDataSuccess,
    fetchHomeCardsDataFailure,
    fetchHomeCardsDataEmpty,
  )
}

export default requestHomeCardsData
