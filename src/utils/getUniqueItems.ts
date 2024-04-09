import { FetchedDBType } from '../types'

function getUniqueItems(arr: FetchedDBType[]) {
  const uniqueItems = [...new Set(arr)]
  return uniqueItems
}

export default getUniqueItems
