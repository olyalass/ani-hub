import { AnimeBaseResponseType, AnimeCardType } from '../../types'

export const parseAnimeResponseItem = (
  item: AnimeBaseResponseType,
): AnimeCardType => ({
  titleEnglish: item.title_english,
  id: item.mal_id,
  titleOrig: item.title,
  genres: item.genres.map((genre: { name: string; mal_id: number }) => {
    return { name: genre.name, id: genre.mal_id }
  }),
  img: item.images.jpg.large_image_url,
  rating: item.rating,
})
