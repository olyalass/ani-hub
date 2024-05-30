import { ReactNode } from 'react'

import { AnimePageDataType } from '../types'

export function createItemsObjForAnimePage(
  data: AnimePageDataType,
  nodeChildrenObj: { rating: ReactNode; genres: ReactNode },
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
      children: nodeChildrenObj.rating,
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
      children: nodeChildrenObj.genres,
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
