import { AnimeBaseResponseType } from '../types'

export function filterAnimeDupes(data: AnimeBaseResponseType[]) {
  const memoIds: { [key: number]: boolean } = data.reduce(
    (acc, item) => ({ ...acc, [item.mal_id]: true }),
    {},
  )
  return data.filter((item) => {
    if (memoIds[item.mal_id]) {
      memoIds[item.mal_id] = false
      return true
    }
    return false
  })
}
