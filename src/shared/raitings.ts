import { RatingType } from '../types'

export const ratings: RatingType[] = [
  {
    key: 'g',
    label: 'G - All Ages',
    color: 'green',
    darkcolor: '#87d068',
    shortlabel: 'G',
  },
  {
    key: 'pg',
    label: 'PG - Children',
    color: 'green',
    darkcolor: '#87d068',
    shortlabel: 'PG',
  },
  {
    key: 'pg13',
    label: 'PG-13 - Teens 13 or older',
    color: 'gold',
    darkcolor: '#e0a502',

    shortlabel: 'PG-13',
  },
  {
    key: 'r17',
    label: 'R - 17+ (violence & profanity)',
    color: 'volcano',
    darkcolor: '#e05302',
    shortlabel: 'R-17',
  },
  {
    key: 'r',
    label: 'R+ - Mild Nudity',
    color: 'volcano',
    darkcolor: '#e05302',
    shortlabel: 'R+',
  },
  {
    key: 'rx',
    label: 'Rx - Hentai',
    color: 'red',
    darkcolor: '#e81b00',
    shortlabel: 'Rx',
  },
]

export const ratingsMap: Record<string, RatingType> = ratings.reduce(
  (acc, item) => ({
    ...acc,
    [item.label]: item,
  }),
  {},
)
