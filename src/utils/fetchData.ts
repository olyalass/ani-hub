import { FetchedDBType } from '../types'
import getUniqueItems from './getUniqueItems'

async function fetchData(url: string): Promise<FetchedDBType[]> {
  const response = await fetch(url)
  const data: { data: FetchedDBType[] } = await response.json()
  const uniqueData = getUniqueItems(data.data)

  return uniqueData
}

export default fetchData
