import { initialSearchFormData } from '../../shared'
import { FiltersType } from '../../types'

export function parseUrlFiltersToObj(url?: string): FiltersType {
  const obj = { ...initialSearchFormData }
  if (url) {
    const urlChunks = url.split('&')
    const genresIdsString = urlChunks
      .find((e) => e.startsWith('genres='))
      ?.slice('genres='.length)
    if (genresIdsString) {
      obj.genres = genresIdsString?.split(',')
    }
    const exclGenresIdsString = urlChunks
      .find((e) => e.startsWith('genres_exclude='))
      ?.slice('genres_exclude='.length)
    if (exclGenresIdsString) {
      obj.genres_exclude = exclGenresIdsString.split(',')
    }
    const orderBy = urlChunks
      .find((e) => e.startsWith('order_by='))
      ?.slice('order_by='.length)
    if (orderBy) {
      obj.order_by = orderBy
    }
    const sort = urlChunks.find((e) => e.startsWith('sort='))?.includes('asc')
    if (sort) {
      obj.isAscending = true
    }
    const rating = urlChunks
      .find((e) => e.startsWith('rating='))
      ?.slice('rating='.length)
    if (rating) {
      obj.rating = rating
    }
    const status = urlChunks
      .find((e) => e.startsWith('status='))
      ?.slice('status='.length)
    if (status) {
      obj.status = status
    }
    const q = urlChunks.find((e) => e.startsWith('q='))?.slice('q='.length)
    if (q) {
      obj.searchword = q
    }
  }
  return obj
}
