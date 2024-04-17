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
  while (newArr.length < iPerPage) {
    currPage += 1
    const diff = iPerPage - newArr.length
    const newUrl = url + `&page=${currPage}`
    const extraData = await getAnimeData(newUrl)
    newArr.concat(extraData.slice(0, diff))
  }
  return newArr
}

export default getDupesReplacement
