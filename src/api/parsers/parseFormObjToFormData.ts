import { FormObjType } from '../../types'

export function parseFormObjToFormData(data: FormObjType): {
  name: string[]
  value: string | boolean | number[] | null
}[] {
  return [
    { name: ['genres'], value: data.genres.map((genre) => Number(genre)) },
    {
      name: ['genres_exclude'],
      value: data.genres_exclude.map((genre) => Number(genre)),
    },
    { name: ['order_by'], value: data.order_by },
    { name: ['isAscending'], value: data.isAscending },
    { name: ['q'], value: data.q },
    { name: ['status'], value: data.status },
    { name: ['rating'], value: data.rating },
  ]
}
