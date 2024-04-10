import { FetchedDBType } from '../../types'

async function requestAnimeData(url: string): Promise<FetchedDBType[]> {
  const response = await fetch(url)
  const data: { data: FetchedDBType[] } = await response.json()

  return [...new Set(data.data)]
}

export default requestAnimeData
