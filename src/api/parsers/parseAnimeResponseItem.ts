import { AnimeBaseResponseType, AnimeCardType } from '../../types'

const parseAnimeResponseItem = (
  item: AnimeBaseResponseType,
): AnimeCardType => ({
  titleEnglish: item.title_english,
  id: item.mal_id,
  titleOrig: item.title,
  genres: item.genres.map((genre: { name: string; mal_id: number }) => {
    return { name: genre.name, id: genre.mal_id }
  }),
  img: item.images.jpg.image_url,
  rating: item.rating,
})

export default parseAnimeResponseItem
