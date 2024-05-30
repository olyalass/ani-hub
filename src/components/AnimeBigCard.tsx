import { Badge, Descriptions, Image, Button } from 'antd'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { AnimePageDataType } from '../types'
import { setGenreToMultiFilters } from '../redux/actionCreators'
import { createItemsObjForAnimePage, getStatusForBadge } from '../utils'

function AnimeBigCard({ data }: { data: AnimePageDataType }) {
  const dispatch = useDispatch()
  const items = createItemsObjForAnimePage(data, {
    rating: (
      <Badge status={getStatusForBadge(data.rating)} text={data.rating} />
    ),
    genres: data.genres.map((genre) => (
      <Link key={genre.key} to="/search">
        <Button
          key={genre.key}
          onClick={() => {
            dispatch(setGenreToMultiFilters(genre.key.toString()))
          }}
        >
          {genre.label}
        </Button>
      </Link>
    )),
  })

  return (
    <div className="anime-page-container">
      <div className="anime-big-card">
        <Badge
          status={getStatusForBadge(data.status)}
          text={data.status}
          style={{ position: 'absolute', top: '2vw', right: '2vw' }}
        />
        <Badge count={data.score}>
          <Image src={data.img} alt={data.cardTitle} width="20vw" />
        </Badge>
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
    </div>
  )
}

export default AnimeBigCard
