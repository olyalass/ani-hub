import { FiltersType } from '../types'

export const initialSearchFormData: FiltersType = {
  order_by: 'score',
  isAscending: false,
  searchword: null,
  rating: null,
  genres: [],
  genres_exclude: [],
  status: null,
}
