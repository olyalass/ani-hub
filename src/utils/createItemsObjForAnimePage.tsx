import { Badge, Button } from 'antd'
import { Link } from 'react-router-dom'

import { AnimePageDataType } from '../types'
import getStatusForBadge from './getStatusForBadge'

function createItemsObjForAnimePage(
  data: AnimePageDataType,
  buttonOnClick: (genreKey: string) => void,
) {
  return [
    {
      key: 'title',
      label: 'Original title',
      children: data.japTitle,
      span: 2,
    },
    {
      key: 'year',
      label: 'Year',
      children: data.year,
      span: { md: 1, lg: 2, xl: 1, xxl: 1 },
    },
    {
      key: 'episodes',
      label: 'Episodes',
      children: data.episodes,
      span: { md: 1, lg: 2, xl: 1, xxl: 1 },
    },
    {
      key: 'rating',
      label: 'Rating',
      children: (
        <Badge status={getStatusForBadge(data.rating)} text={data.rating} />
      ),
      span: { md: 2, lg: 2, xl: 1, xxl: 1 },
    },
    {
      key: 'score',
      label: 'Score',
      children: data.score,
      span: { md: 2, lg: 2, xl: 1, xxl: 1 },
    },
    {
      key: 'genres',
      label: 'Genres',
      children: data.genres.map((genre) => (
        <Link key={genre.key} to="/search">
          <Button
            key={genre.key}
            onClick={() => {
              buttonOnClick(genre.key.toString())
            }}
          >
            {genre.label}
          </Button>
        </Link>
      )),
      span: { md: 2, lg: 2, xl: 2, xxl: 3 },
    },
    {
      key: 'synopsis',
      label: 'Synopsis',
      children: data.synopsis,
      span: { md: 2, lg: 2, xl: 2, xxl: 3 },
    },
    {
      key: 'producers',
      label: 'Producers',
      children: data.producers.join(', '),
      span: { md: 2, lg: 2, xl: 2, xxl: 3 },
    },
  ]
}

export default createItemsObjForAnimePage
