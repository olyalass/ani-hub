import { Card, Tag } from 'antd'
import { useContext } from 'react'

import { AnimeCardType } from '../../types'
import { ratingsMap } from '../../shared/raitings'
import ThemeContext from '../../shared/ThemeContext'

const { Meta } = Card

type Props = {
  cardData: AnimeCardType
}

function AnimeCard({ cardData }: Props) {
  const isLightTheme = useContext(ThemeContext)
  const ratingInfo = ratingsMap[cardData.rating]
  return (
    <Card
      className="anime-card"
      cover={
        <img
          alt={cardData.titleEnglish}
          src={cardData.img}
          height="250px"
          style={{ objectFit: 'cover' }}
        />
      }
    >
      <Tag
        color={isLightTheme ? ratingInfo.color : ratingInfo.darkcolor}
        className="anime-card-tag"
      >
        {ratingInfo.shortlabel}
      </Tag>
      <Meta
        title={cardData.titleEnglish}
        description={cardData.titleOrig}
        className="anime-card-title"
      />
      <div className="anime-card-tags-container">
        {cardData.genres.map((genre) => (
          <Tag color={isLightTheme ? 'magenta' : '#d29ada'} key={genre.id}>
            {genre.name}
          </Tag>
        ))}
      </div>
    </Card>
  )
}

export default AnimeCard
