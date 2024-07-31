import { combineReducers } from 'redux'

import {
  genresReducer,
  listsReducer,
  pageReducer,
  searchCardsReducer,
  homeCardsReducer,
} from './slices'

const rootReducer = combineReducers({
  lists: listsReducer,
  genres: genresReducer,
  homeCards: homeCardsReducer,
  animePage: pageReducer,
  searchCards: searchCardsReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
