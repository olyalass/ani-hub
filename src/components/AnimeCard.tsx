import { Card, ConfigProvider, Flex, Tag } from 'antd'
import { useContext } from 'react'

import { AnimeCardType } from '../types'
import { ratingsMap } from '../shared/raitings'
import ThemeContext from '../shared/ThemeContext'

const { Meta } = Card

type Props = {
  cardData: AnimeCardType
}

function AnimeCard({ cardData }: Props) {
  const isLightTheme = useContext(ThemeContext)
  const ratingInfo = ratingsMap[cardData.rating]
  return (
    <ConfigProvider
      theme={{
        token: {
          colorTextHeading: isLightTheme ? '#000' : '#E4DEE4',
          colorTextDescription: isLightTheme
            ? 'rgba(0, 0, 0, 0.45)'
            : '#B7A6B3',
        },
      }}
    >
      <Card
        style={{ width: '200px', height: '400px', overflow: 'hidden' }}
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
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            maxWidth: '50px',
            overflow: 'hidden',
          }}
        >
          {ratingInfo.shortlabel}
        </Tag>
        <Meta
          title={cardData.titleEnglish}
          description={cardData.titleOrig}
          style={{
            maxHeight: '60px',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
        />
        <Flex
          wrap="wrap"
          gap="5px"
          style={{
            paddingTop: '10px',
            maxHeight: '60px',
            overflow: 'hidden',
          }}
        >
          {cardData.genres.map((genre) => (
            <Tag color={isLightTheme ? 'magenta' : '#d29ada'} key={genre.id}>
              {genre.name}
            </Tag>
          ))}
        </Flex>
      </Card>
    </ConfigProvider>
  )
}

export default AnimeCard
