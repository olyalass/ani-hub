import { MonoFiltersType } from '../../types'

const baseTopUrl =
  'https://corsproxy.io/?https://api.jikan.moe/v4/top/anime?sfw&limit='

const altTopUrl =
  'https://corsproxy.io/?https://api.jikan.moe/v4/anime?sfw&order_by=popularity&limit='

function createGetTopAnimeUrl(
  filters?: MonoFiltersType,
  cardsPerPage: number = 1,
  page: number = 1,
) {
  if (filters) {
    if (filters.genre) {
      console.log(filters.genre)
      return (
        altTopUrl + cardsPerPage + '&genres=' + filters.genre + '&page=' + page
      )
    }
    if (filters.rating) {
      return (
        baseTopUrl +
        cardsPerPage +
        '&rating=' +
        filters.rating +
        '&page=' +
        page
      )
    }
  }
  return baseTopUrl + cardsPerPage + '&page=' + page
}

export default createGetTopAnimeUrl
