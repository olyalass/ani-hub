import { Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'

import { GenresBaseResponseType, GenreType } from '../../types'
import { ActionType } from '../actions'
import {
  fetchGenresFailure,
  fetchGenresRequest,
  fetchGenresSuccess,
} from '../thunk/thunkActionCreators'
import parseGenre from '../../api/parsers/parseGenre'

function requestGenres(): ThunkAction<void, GenreType[], unknown, ActionType> {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(fetchGenresRequest())
      const response = await fetch(
        'https://corsproxy.io/?https://api.jikan.moe/v4/genres/anime',
      )
      const { data }: { data: GenresBaseResponseType[] } = await response.json()
      dispatch(fetchGenresSuccess(data.map(parseGenre)))
    } catch {
      dispatch(fetchGenresFailure())
    }
  }
}

export default requestGenres
