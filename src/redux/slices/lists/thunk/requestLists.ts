import initDb from '../../../../api/initDb'
import { DispatchType, ListsType } from '../../../../types'
import {
  fetchListsFailure,
  fetchListsRequest,
  fetchListsSuccess,
} from '../actions/actionCreators'

function requestLists() {
  return async (dispatch: DispatchType) => {
    dispatch(fetchListsRequest())
    try {
      const db = await initDb()
      const transaction = db.transaction('lists', 'readonly')
      const objectStore = transaction.objectStore('lists')
      const cursorRequest = objectStore.openCursor()

      const lists: ListsType = {}

      cursorRequest.onsuccess = function (event) {
        const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result
        if (cursor) {
          lists[cursor.key as string] = cursor.value
          cursor.continue()
        } else {
          dispatch(fetchListsSuccess(lists))
        }
      }

      cursorRequest.onerror = function () {
        dispatch(fetchListsFailure())
      }
    } catch {
      dispatch(fetchListsFailure())
    }
  }
}

export default requestLists
