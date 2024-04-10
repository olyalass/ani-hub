import { FetchedDBType } from '../../types'
import requestAnimeData from './requestAnimeData'

async function requestDupesReplacement(
  arr: FetchedDBType[],
  url: string,
  page: number,
  iPerPage: number,
) {
  const newArr: FetchedDBType[] = arr.slice(0)
  while (newArr.length < iPerPage) {
    ++page
    const diff = iPerPage - newArr.length
    const newUrl = url + `&page=${page}`
    const extraData = await requestAnimeData(newUrl)

    newArr.concat(extraData.slice(0, diff))
  }
  return newArr
}

export default requestDupesReplacement
