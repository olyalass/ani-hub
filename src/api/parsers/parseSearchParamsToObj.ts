import { initialSearchFormData } from '../../shared'
import { FiltersType } from '../../types'

export function parseSearchParamsToObj(params?: URLSearchParams): FiltersType {
  const obj = { ...initialSearchFormData }
  if (params) {
    const genresIdsString = params.get('genres')
    if (genresIdsString) {
      obj.genres = genresIdsString?.split(',')
    }
    const exclGenresIdsString = params.get('genres_exclude')
    if (exclGenresIdsString) {
      obj.genres_exclude = exclGenresIdsString.split(',')
    }
    const orderBy = params.get('order_by')
    if (orderBy) {
      obj.order_by = orderBy
    }
    const sort = params.get('sort=')
    if (sort === 'asc') {
      obj.isAscending = true
    }
    const rating = params.get('rating')
    if (rating) {
      obj.rating = rating
    }
    const status = params.get('status')
    if (status) {
      obj.status = status
    }
    const q = params.get('q')
    if (q) {
      obj.searchword = q
    }
  }
  return obj
}
