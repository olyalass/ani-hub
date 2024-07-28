import {
  postNewListFailure,
  postNewListRequest,
  postNewListSuccess,
} from '../actions/actionCreators'
import initDb from '../../../../api/initDb'
import { DispatchType } from '../../../../types'

function postNewList(listName: string, ids?: number[]) {
  return async (dispatch: DispatchType) => {
    dispatch(postNewListRequest())
    try {
      const db = await initDb()
      const transaction = db.transaction('lists', 'readwrite')
      const objectStore = transaction.objectStore('lists')
      let value: number[] = []
      if (ids) {
        value = value.concat(ids)
      }
      const request = objectStore.add(value, listName)

      request.onsuccess = () => {
        dispatch(postNewListSuccess(listName, value))
      }
      request.onerror = () => {
        dispatch(postNewListFailure())
      }
    } catch (e) {
      dispatch(postNewListFailure())
    }
  }
}

export default postNewList
