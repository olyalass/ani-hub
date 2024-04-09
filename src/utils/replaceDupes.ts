import { FetchedDBType } from '../types'
import fetchData from './fetchData'

async function replaceDupes(
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
    const extraData = await fetchData(newUrl)

    newArr.concat(extraData.slice(0, diff))
  }
  return newArr
}

export default replaceDupes
