import { FiltersType } from '../../types'

export function parseObjFiltersToUrl(filterObj: FiltersType): string {
  let searchQuery = ''
  if (filterObj.genres[0]) {
    const genres = filterObj.genres.join(',')
    searchQuery = searchQuery + '&genres=' + genres
  }
  if (filterObj.genres_exclude[0]) {
    const exclGenres = filterObj.genres_exclude.join(',')
    searchQuery = searchQuery + '&genres_exclude=' + exclGenres
  }
  if (filterObj.isAscending) {
    searchQuery = searchQuery + '&sort=' + 'asc'
  } else {
    searchQuery = searchQuery + '&sort=' + 'desc'
  }
  if (filterObj.order_by) {
    searchQuery = searchQuery + '&order_by=' + filterObj.order_by
  }
  if (filterObj.searchword) {
    searchQuery = searchQuery + '&q=' + filterObj.searchword
  }
  if (filterObj.rating) {
    searchQuery = searchQuery + '&rating=' + filterObj.rating
  }
  if (filterObj.status) {
    searchQuery = searchQuery + '&status=' + filterObj.status
  }
  return searchQuery
}
