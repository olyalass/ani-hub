import { AnimeBaseResponseType } from '../../types'
import filterAnimeDupes from '../../utils/filterAnimeDupes'

async function getAnimeData(url: string): Promise<AnimeBaseResponseType[]> {
  const response = await fetch(url)
  const data: { data: AnimeBaseResponseType[] } = await response.json()

  return filterAnimeDupes(data.data)
}

export default getAnimeData
