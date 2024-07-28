import initDb from '../../../../api/initDb'
import { DispatchType } from '../../../../types'
import {
  deleteItemFromListFailure,
  deleteItemFromListRequest,
  deleteItemFromListSuccess,
} from '../actions/actionCreators'

function deleteItemFromList(listName: string, animeId: number) {
  return async (dispatch: DispatchType) => {
    dispatch(deleteItemFromListRequest())
    try {
      const db = await initDb()
      const transaction = db.transaction('lists', 'readwrite')
      const objectStore = transaction.objectStore('lists')
      const getRequest = objectStore.get(listName)

      getRequest.onsuccess = (event) => {
        const data = (event.target as IDBRequest).result as number[]
        let newData: number[] = []
        if (data && data.length > 0) {
          newData = data.filter((id) => id !== animeId)
        }
        const putRequest = objectStore.put(newData, listName)

        putRequest.onsuccess = () => {
          dispatch(deleteItemFromListSuccess(listName, animeId))
        }

        putRequest.onerror = () => {
          dispatch(deleteItemFromListFailure())
        }
      }

      getRequest.onerror = () => {
        dispatch(deleteItemFromListFailure())
      }
    } catch {
      dispatch(deleteItemFromListFailure())
    }
  }
}

export default deleteItemFromList
