import { Card, Tag, Modal } from 'antd'
import { useContext, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { DeleteOutlined, ZoomInOutlined } from '@ant-design/icons'

import { AnimeCardType, DispatchType } from '../types'
import { ThemeContext, ratingsMap } from '../shared'
import { deleteItemFromList } from '../redux/slices'
import AddToListSelect from './AddToListSelect'
const { Meta } = Card

type Props = {
  cardData: AnimeCardType
  isDeletable: boolean
}

function AnimeCard({ cardData, isDeletable }: Props) {
  const dispatch: DispatchType = useDispatch()
  const navigate = useNavigate()
  const genreTagsRef = useRef<HTMLDivElement>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const isLightTheme = useContext(ThemeContext)
  const ratingInfo = ratingsMap[cardData.rating]
  const { listname } = useParams()
  let message = 'Are you sure you want to delete '
  if (isDeletable) {
    const animeTitle = cardData.titleEnglish
    if (!animeTitle || animeTitle !== '') {
      message = message + animeTitle + ' from '
    } else {
      message = message + 'this anime from '
    }
    if (listname && listname.includes('list')) {
      message = message + listname
    } else {
      message = message + listname + ' list'
    }
  }
  return (
    <Card
      className="anime-card"
      cover={
        <div
          className="poster-container"
          title="Show more info"
          onClick={() => {
            navigate('/' + cardData.id)
          }}
        >
          {ratingInfo && (
            <Tag
              color={isLightTheme ? ratingInfo.color : ratingInfo.darkcolor}
              className="anime-card-tag"
            >
              {ratingInfo.shortlabel}
            </Tag>
          )}
          <div className="poster-addition">
            <ZoomInOutlined className="poster-icon" />
            <p>Show more info</p>
          </div>
          <img
            className="poster"
            alt={cardData.titleEnglish}
            src={cardData.img}
            style={{ width: 'inherit' }}
          />
        </div>
      }
    >
      {listname && isDeletable && (
        <Modal
          open={isModalOpen}
          title={message}
          onOk={() => {
            dispatch(deleteItemFromList(listname, cardData.id))
            setIsModalOpen(false)
          }}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
      {isDeletable && (
        <Tag
          title="remove from list"
          className="delete-button"
          onClick={() => setIsModalOpen(true)}
        >
          <DeleteOutlined />
        </Tag>
      )}
      <Meta
        title={cardData.titleEnglish}
        description={cardData.titleOrig}
        className="anime-card-title"
      />
      <div className="anime-card-tags-container" ref={genreTagsRef}>
        {cardData.genres.map((genre) => (
          <Tag
            color={isLightTheme ? 'magenta' : '#d29ada'}
            title={'Go to ' + genre.name}
            key={genre.id}
            onClick={() => {
              navigate('/search?genres=' + genre.id)
            }}
            style={{ cursor: 'pointer' }}
          >
            {genre.name}
          </Tag>
        ))}
      </div>
      <AddToListSelect isBigCard={false} animeId={cardData.id} />
    </Card>
  )
}

export default AnimeCard
