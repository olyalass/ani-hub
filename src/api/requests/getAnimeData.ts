import { AnimeBaseResponseType } from '../../types'
import filterAnimeDupes from '../../utils/filterAnimeDupes'

async function getAnimeData(url: string): Promise<{
  data: AnimeBaseResponseType[]
  isFiltered: boolean
  totalPages: number
}> {
  const response = await fetch(url)
  const data: {
    data: AnimeBaseResponseType[]
    pagination: { last_visible_page: number }
  } = await response.json()
  const totalPages = data.pagination.last_visible_page
  const noDupesData = filterAnimeDupes(data.data)

  return {
    data: noDupesData,
    isFiltered: data.data.length > noDupesData.length,
    totalPages,
  }
}

export default getAnimeData
