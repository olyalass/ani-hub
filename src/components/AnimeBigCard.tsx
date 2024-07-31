import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { YoutubeFilled } from '@ant-design/icons'
import Paragraph from 'antd/es/typography/Paragraph'
import { Badge, Descriptions, Image, Button, Typography } from 'antd'

import { AnimePageDataType } from '../types'
import { createItemsObjForAnimePage, getStatusForBadge } from '../utils'
import AddToListSelect from './AddToListSelect'
import { ThemeContext } from '../shared'

function AnimeBigCard({ data }: { data: AnimePageDataType }) {
  const theme = useContext(ThemeContext)
  const navigate = useNavigate()
  const items = createItemsObjForAnimePage(data, {
    rating: (
      <Badge status={getStatusForBadge(data.rating)} text={data.rating} />
    ),
    genres: data.genres.map((genre) => (
      <Button
        key={genre.key}
        title={'Go to ' + genre.label}
        onClick={() => {
          navigate('/search?genres=' + genre.key)
        }}
      >
        {genre.label}
      </Button>
    )),
    lists: <AddToListSelect isBigCard={true} animeId={data.id} />,
    synopsis: (
      <Paragraph ellipsis={{ expandable: true, rows: 2 }}>
        {data.synopsis}
      </Paragraph>
    ),
  })

  return (
    <div className="anime-big-card-container">
      <Badge
        status={getStatusForBadge(data.status)}
        text={data.status}
        style={{ position: 'absolute', top: '2vw', right: '2vw' }}
      />
      <div className="anime-big-card">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <Badge count={data.score}>
            <Image src={data.img} alt={data.cardTitle} width="20vw" />
          </Badge>
          {data.trailer && (
            <Typography.Link href={data.trailer} target="_blank">
              <YoutubeFilled /> Watch trailer
            </Typography.Link>
          )}
        </div>
        <Descriptions
          bordered
          title={data.cardTitle}
          items={items}
          className="descriptions"
          column={{
            sm: 1,
            md: 2,
            lg: 2,
            xl: 2,
            xxl: 3,
          }}
        />
      </div>
      <div
        className={
          theme ? 'anime-big-card-extra' : 'anime-big-card-extra light-text'
        }
      >
        {data.related.length > 0 && (
          <ul>
            <h3>Related Titles</h3>
            {data.related.map((related) => (
              <ul key={related.relation}>
                <h4>{related.relation}</h4>
                {related.entry.map((item) => (
                  <li key={item.id}>
                    <Link to={`/${item.id}`}>{item.title}</Link>
                  </li>
                ))}
              </ul>
            ))}
          </ul>
        )}
        {(data.music.openings.length > 0 || data.music.endings.length > 0) && (
          <ul>
            <h3>Music</h3>
            {data.music.openings && (
              <ul>
                <h4>Openings</h4>
                {data.music.openings.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            )}
            {data.music.endings && (
              <ul>
                <h4>Endings</h4>
                {data.music.endings.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            )}
          </ul>
        )}
      </div>
    </div>
  )
}

export default AnimeBigCard
