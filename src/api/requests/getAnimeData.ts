import { AnimeBaseResponseType } from '../../types'
import filterAnimeDupes from '../../utils/filterAnimeDupes'

async function getAnimeData(url: string): Promise<AnimeBaseResponseType[]> {
  try {
    const response = await fetch(url)
    const data: { data: AnimeBaseResponseType[] } = await response.json()

    return filterAnimeDupes(data.data)
  } catch {
    throw new Error()
  }
}

export default getAnimeData
