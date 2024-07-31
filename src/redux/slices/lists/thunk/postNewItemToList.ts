import initDb from '../../../../api/initDb'
import { DispatchType } from '../../../../types'
import {
  postNewItemToListFailure,
  postNewItemToListRequest,
  postNewItemToListSuccess,
} from '../actions/actionCreators'

function postNewItemToList(listName: string, newId: number) {
  return async (dispatch: DispatchType) => {
    dispatch(postNewItemToListRequest())

    try {
      const db = await initDb()
      const transaction = db.transaction('lists', 'readwrite')
      const objectStore = transaction.objectStore('lists')
      const getRequest = objectStore.get(listName)

      getRequest.onsuccess = (event) => {
        const data = (event.target as IDBRequest).result as number[]
        data.push(newId)
        const putRequest = objectStore.put(data, listName)

        putRequest.onsuccess = () => {
          dispatch(postNewItemToListSuccess(listName, newId))
        }

        putRequest.onerror = () => {
          dispatch(postNewItemToListFailure())
        }
      }
      getRequest.onerror = () => {
        dispatch(postNewItemToListFailure())
      }
    } catch {
      dispatch(postNewItemToListFailure())
    }
  }
}

export default postNewItemToList
