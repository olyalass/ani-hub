import { FiltersType } from '../types'

const baseTopUrl =
  'https://corsproxy.io/?https://api.jikan.moe/v4/top/anime?sfw&limit='

const altTopUrl =
  'https://corsproxy.io/?https://api.jikan.moe/v4/anime?sfw&order_by=popularity&limit='

const baseSearchUrl =
  'https://corsproxy.io/?https://api.jikan.moe/v4/anime?limit='

const baseIdUrl = 'https://corsproxy.io/?https://api.jikan.moe/v4/anime/'

function createGetAnimeUrl(
  type: 'top' | 'search' | 'byId',
  filters?: FiltersType,
  limit: number = 1,
  q?: string,
  id?: number,
) {
  let baseUrl = ''
  switch (type) {
    case 'top':
      baseUrl = baseTopUrl + limit
      break
    case 'search':
      baseUrl = baseSearchUrl + limit
      break
    case 'byId':
      return baseIdUrl + id
    default:
      baseUrl = baseSearchUrl + limit
      break
  }
  let filterQuery = ''
  if (filters) {
    if (filters.genres[0]) {
      const genreQuery = `&genres=${filters.genres.join(', ')}`
      filterQuery = genreQuery
      if (type === 'top') {
        baseUrl = altTopUrl + limit
      }
    }
    if (filters.rating[0]) {
      const ratingQuery = `&rating=${filters.rating[0]}`
      filterQuery = filterQuery + ratingQuery
    }
  }
  if (q && type === 'search') {
    filterQuery = `&q=` + q + filterQuery
  }
  const url = baseUrl + filterQuery
  return url
}

export default createGetAnimeUrl
