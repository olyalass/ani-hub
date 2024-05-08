import { AnimeBaseResponseType } from '../../types'

async function getAnimePageData(url: string) {
  try {
    const response = await fetch(url)
    if (response.status === 404) {
      return null
    }
    const data: { data: AnimeBaseResponseType } = await response.json()

    return data.data
  } catch {
    throw new Error()
  }
}

export default getAnimePageData
