import initDb from '../../../../api/initDb'
import { DispatchType } from '../../../../types'
import {
  deleteListFailure,
  deleteListRequest,
  deleteListSuccess,
} from '../actions/actionCreators'

function deleteList(listName: string) {
  return async (dispatch: DispatchType) => {
    dispatch(deleteListRequest())

    try {
      const db = await initDb()
      const transaction = db.transaction('lists', 'readwrite')
      const objectStore = transaction.objectStore('lists')
      const request = objectStore.delete(listName)

      request.onsuccess = () => {
        dispatch(deleteListSuccess(listName))
      }
      request.onerror = () => {
        dispatch(deleteListFailure())
      }
    } catch {
      dispatch(deleteListFailure())
    }
  }
}

export default deleteList
