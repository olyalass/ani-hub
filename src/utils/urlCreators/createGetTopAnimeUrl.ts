import { HomeFiltersType } from '../../types'

const baseTopUrl =
  'https://corsproxy.io/?https://api.jikan.moe/v4/top/anime?limit='

const altTopUrl =
  'https://corsproxy.io/?https://api.jikan.moe/v4/anime?order_by=popularity&limit='

export function createGetTopAnimeUrl(
  filters?: HomeFiltersType,
  cardsPerPage: number = 1,
  page: number = 1,
) {
  if (filters) {
    if (filters.genre) {
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
