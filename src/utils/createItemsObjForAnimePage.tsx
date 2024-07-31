import { ReactNode } from 'react'

import { AnimePageDataType } from '../types'

export function createItemsObjForAnimePage(
  data: AnimePageDataType,
  nodeChildrenObj: {
    rating: ReactNode
    genres: ReactNode
    lists: ReactNode
    synopsis: ReactNode
  },
) {
  const arr = [
    {
      key: 'title',
      label: 'Original title',
      children: data.japTitle,
      span: { sm: 1, md: 2, lg: 2, xl: 2, xxl: 2 },
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
      span: { md: 2, lg: 2, xl: 2, xxl: 2 },
    },
  ]
  if (data.genres.length > 0) {
    arr.push({
      key: 'genres',
      label: 'Genres',
      children: nodeChildrenObj.genres,
      span: { md: 2, lg: 2, xl: 2, xxl: 3 },
    })
  }
  if (data.themes.length > 0) {
    arr.push({
      key: 'themes',
      label: 'Themes',
      children: data.themes.join(', '),
      span: { md: 2, lg: 2, xl: 2, xxl: 3 },
    })
  }
  if (data.synopsis) {
    arr.push({
      key: 'synopsis',
      label: 'Synopsis',
      children: nodeChildrenObj.synopsis,
      span: { md: 2, lg: 2, xl: 2, xxl: 3 },
    })
  }
  if (data.studios.length > 0) {
    arr.push({
      key: 'studios',
      label: 'Studios',
      children: data.studios.join(', '),
      span: { md: 2, lg: 2, xl: 2, xxl: 3 },
    })
  }
  arr.push({
    key: 'lists',
    label: 'Lists',
    children: nodeChildrenObj.lists,
    span: { md: 2, lg: 2, xl: 2, xxl: 3 },
  })
  return arr
}
