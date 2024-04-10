import { AnimeBaseResponseType } from '../../types'

async function requestAnimeData(url: string): Promise<AnimeBaseResponseType[]> {
  const response = await fetch(url)
  const data: { data: AnimeBaseResponseType[] } = await response.json()

  return [...new Set(data.data)]
}

export default requestAnimeData
