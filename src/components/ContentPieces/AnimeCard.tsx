import { Card, Tag } from 'antd'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { AnimeCardType } from '../../types'
import { ratingsMap } from '../../shared/raitings'
import ThemeContext from '../../shared/ThemeContext'
import { setGenreToMultiFilters } from '../../redux/actionCreators'

const { Meta } = Card

type Props = {
  cardData: AnimeCardType
}

function AnimeCard({ cardData }: Props) {
  const dispatch = useDispatch()
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
      {ratingInfo && (
        <Tag
          color={isLightTheme ? ratingInfo.color : ratingInfo.darkcolor}
          className="anime-card-tag"
        >
          {ratingInfo.shortlabel}
        </Tag>
      )}
      <Meta
        title={cardData.titleEnglish}
        description={cardData.titleOrig}
        className="anime-card-title"
      />
      <div className="anime-card-tags-container">
        {cardData.genres.map((genre) => (
          <Link to="/search" key={genre.id}>
            <Tag
              color={isLightTheme ? 'magenta' : '#d29ada'}
              key={genre.id}
              onClick={() => {
                dispatch(setGenreToMultiFilters(genre.id.toString()))
              }}
            >
              {genre.name}
            </Tag>
          </Link>
        ))}
      </div>
    </Card>
  )
}

export default AnimeCard
