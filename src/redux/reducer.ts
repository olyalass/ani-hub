import { combineReducers } from 'redux'
import {
  genresReducer,
  listsReducer,
  pageReducer,
  searchCardsReducer,
} from './slices'
import homeCardsReducer from './slices/homeCards/reducer'

const rootReducer = combineReducers({
  lists: listsReducer,
  genres: genresReducer,
  homeCards: homeCardsReducer,
  animePage: pageReducer,
  searchCards: searchCardsReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
