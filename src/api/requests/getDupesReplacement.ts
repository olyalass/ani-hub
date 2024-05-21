import { AnimeBaseResponseType } from '../../types'
import getAnimeData from './getAnimeData'

async function getDupesReplacement(
  arr: AnimeBaseResponseType[] | void,
  url: string,
  page: number,
  iPerPage: number,
) {
  let newArr: AnimeBaseResponseType[]
  if (arr instanceof Array) {
    newArr = arr.slice(0)
  } else {
    newArr = []
  }
  let currPage = page
  const baseUrl = url.slice(0, url.lastIndexOf('=') + 1)
  while (iPerPage - newArr.length > 0) {
    currPage += 1
    const diff = iPerPage - newArr.length
    const newUrl = baseUrl + currPage
    const { data } = await getAnimeData(newUrl)
    newArr = newArr.concat(data.slice(0, diff))
  }
  return newArr
}

export default getDupesReplacement
