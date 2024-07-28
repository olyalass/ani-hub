import { FiltersType } from '../../types'

export function parseFormObjToFormData(data: FiltersType): {
  name: string[]
  value: string | boolean | number[] | null
}[] {
  let searchwordValue = data.searchword
  if (typeof searchwordValue === 'undefined') {
    searchwordValue = null
  }
  return [
    { name: ['genres'], value: data.genres.map((genre) => Number(genre)) },
    {
      name: ['genres_exclude'],
      value: data.genres_exclude.map((genre) => Number(genre)),
    },
    { name: ['order_by'], value: data.order_by },
    { name: ['isAscending'], value: data.isAscending },
    { name: ['searchword'], value: searchwordValue },
    { name: ['status'], value: data.status },
    { name: ['rating'], value: data.rating },
  ]
}
