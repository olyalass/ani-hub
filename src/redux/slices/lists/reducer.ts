import { ListsStateType } from '../../../types'
import { ListsActionType } from './actions/actions'
import * as actionTypes from './actions/actionTypes'

const initialState: ListsStateType = {
  lists: {},
  currListAnimeCards: [],
  isListsLoading: false,
  isListsError: false,
  isCardsDataLoading: false,
  isCardsDataError: false,
  isCardsDataEmpty: false,
  isPostingLists: false,
  isPostingError: false,
}

const listsReducer = (
  state: ListsStateType = initialState,
  action: ListsActionType,
): ListsStateType => {
  switch (action.type) {
    case actionTypes.FETCH_LISTS_REQUEST:
      return {
        ...state,
        isListsLoading: true,
        isListsError: false,
      }
    case actionTypes.FETCH_LISTS_SUCCESS:
      return {
        ...state,
        isListsLoading: false,
        lists: action.payload,
      }
    case actionTypes.FETCH_LISTS_FAILURE:
      return {
        ...state,
        isListsLoading: false,
        isListsError: true,
      }
    case actionTypes.POST_NEW_LIST_REQUEST:
    case actionTypes.DELETE_LIST_REQUEST:
    case actionTypes.POST_NEW_ITEM_TO_LIST_REQUEST:
    case actionTypes.DELETE_ITEM_FROM_LIST_REQUEST:
      return {
        ...state,
        isListsLoading: true,
        isListsError: false,
      }
    case actionTypes.POST_NEW_LIST_SUCCESS:
      return {
        ...state,
        isListsLoading: false,
        lists: {
          ...state.lists,
          [action.payload.listName]: action.payload.value,
        },
      }
    case actionTypes.DELETE_LIST_SUCCESS: {
      const newLists = { ...state.lists }
      delete newLists[action.payload]
      return {
        ...state,
        isListsLoading: false,
        lists: newLists,
      }
    }
    case actionTypes.POST_NEW_ITEM_TO_LIST_SUCCESS:
      return {
        ...state,
        isListsLoading: false,
        lists: {
          ...state.lists,
          [action.payload.listName]: [
            ...state.lists[action.payload.listName],
            action.payload.newId,
          ],
        },
      }
    case actionTypes.DELETE_ITEM_FROM_LIST_SUCCESS:
      return {
        ...state,
        isListsLoading: false,
        lists: {
          ...state.lists,
          [action.payload.listName]: [
            ...state.lists[action.payload.listName].filter(
              (id) => id !== action.payload.animeId,
            ),
          ],
        },
      }
    case actionTypes.POST_NEW_LIST_FAILURE:
    case actionTypes.DELETE_LIST_FAILURE:
    case actionTypes.POST_NEW_ITEM_TO_LIST_FAILURE:
    case actionTypes.DELETE_ITEM_FROM_LIST_FAILURE:
      return {
        ...state,
        isListsLoading: false,
        isListsError: true,
      }
    case actionTypes.FETCH_LIST_ANIMES_REQUEST:
      return {
        ...state,
        isCardsDataLoading: true,
        isCardsDataError: false,
        isCardsDataEmpty: false,
      }
    case actionTypes.FETCH_LIST_ANIMES_SUCCESS:
      return {
        ...state,
        isCardsDataLoading: false,
        currListAnimeCards: action.payload,
      }
    case actionTypes.FETCH_LIST_ANIMES_EMPTY:
      return {
        ...state,
        isCardsDataLoading: false,
        currListAnimeCards: [],
        isCardsDataEmpty: true,
      }
    case actionTypes.FETCH_LIST_ANIMES_FAILURE:
      return {
        ...state,
        isCardsDataLoading: false,
        isCardsDataError: true,
      }
    default:
      return state
  }
}

export default listsReducer
