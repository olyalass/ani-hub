import { AnimeBaseResponseType } from '../../types'
import { filterAnimeDupes } from '../../utils'
import { setPageNumToUrl } from '../../utils/urlCreators/setPageNumToUrl'
import { getAnimeData } from './getAnimeData'

export async function getDupesReplacement(
  arr: AnimeBaseResponseType[] | void,
  url: string,
  page: number,
  iPerPage: number,
  totalPages: number,
) {
  let newArr: AnimeBaseResponseType[]
  if (arr instanceof Array) {
    newArr = arr.slice(0)
  } else {
    newArr = []
  }
  let currPage = page
  while (iPerPage - newArr.length > 0 && totalPages > currPage) {
    currPage += 1
    const diff = iPerPage - newArr.length
    const newUrl = setPageNumToUrl(currPage, url)
    const { data } = await getAnimeData(newUrl)
    newArr = newArr.concat(data.slice(0, diff))
    newArr = filterAnimeDupes(newArr)
  }
  return newArr
}
