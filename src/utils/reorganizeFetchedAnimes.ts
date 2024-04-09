import { FetchedDBType } from '../types'

export default function reorganizeFetchedAnimes(data: FetchedDBType[]) {
  const result = data.map((item: FetchedDBType) => {
    return {
      titleEnglish: item.title_english,
      id: item.mal_id,
      titleOrig: item.title,
      genres: item.genres.map((genre: { name: string; mal_id: number }) => {
        return { name: genre.name, id: genre.mal_id }
      }),
      img: item.images.jpg.image_url,
      rating: item.rating,
    }
  })

  return result
}
