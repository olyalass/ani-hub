import { FormObjType } from '../../types'

const baseSearchUrl =
  'https://corsproxy.io/?https://api.jikan.moe/v4/anime?limit='

export function createAdvancedSearchAnimeUrl(
  formData: FormObjType,
  cardsPerPage: number,
  page: number = 1,
) {
  let searchQuery = ''
  if (formData.genres[0]) {
    const genres = formData.genres.join(',')
    searchQuery = searchQuery + '&genres=' + genres
  }
  if (formData.genres_exclude[0]) {
    const exclGenres = formData.genres_exclude.join(',')
    searchQuery = searchQuery + '&genres_exclude=' + exclGenres
  }
  if (formData.isAscending) {
    searchQuery = searchQuery + '&sort=' + 'asc'
  } else {
    searchQuery = searchQuery + '&sort=' + 'desc'
  }
  if (formData.order_by) {
    searchQuery = searchQuery + '&order_by=' + formData.order_by
  }
  if (formData.q) {
    searchQuery = searchQuery + '&q=' + formData.q
  }
  if (formData.rating) {
    searchQuery = searchQuery + '&rating=' + formData.rating
  }
  if (formData.status) {
    searchQuery = searchQuery + '&status=' + formData.status
  }
  return baseSearchUrl + cardsPerPage + searchQuery + '&page=' + page
}
