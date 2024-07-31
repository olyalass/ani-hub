import {
  CardsActionType,
  PageActionType,
  ListsActionType,
  FiltersActionType,
} from './slices'

export type ActionType =
  | CardsActionType
  | PageActionType
  | ListsActionType
  | FiltersActionType
