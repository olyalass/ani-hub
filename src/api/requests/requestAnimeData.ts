import { AnimeBaseResponseType } from '../../types'

async function requestAnimeData(url: string): Promise<AnimeBaseResponseType[]> {
  const response = await fetch(url)
  const data: { data: AnimeBaseResponseType[] } = await response.json()
  const memoIds: { [key: number]: boolean } = data.data.reduce(
    (acc, item) => ({ ...acc, [item.mal_id]: true }),
    {},
  )
  return data.data.filter((item) => {
    if (memoIds[item.mal_id]) {
      memoIds[item.mal_id] = false
      return true
    }
    return false
  })
}

export default requestAnimeData
