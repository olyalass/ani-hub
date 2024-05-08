import { Badge, ConfigProvider, Descriptions, Image } from 'antd'
import { useDispatch } from 'react-redux'
import { useContext } from 'react'

import { AnimePageDataType } from '../types'
import ThemeContext from '../shared/ThemeContext'
import { setMonoGenre } from '../redux/actionCreators'
import createItemsObjForAnimePage from '../utils/createItemsObjForAnimePage'
import getStatusForBadge from '../utils/getStatusForBadge'

function AnimeBigCard({ data }: { data: AnimePageDataType }) {
  const dispatch = useDispatch()
  const isLightTheme = useContext(ThemeContext)
  const items = createItemsObjForAnimePage(data, (genreKey: string) => {
    dispatch(setMonoGenre(genreKey))
  })

  return (
    <ConfigProvider
      theme={{
        token: {
          colorTextSecondary: isLightTheme
            ? 'rgba(0, 0, 0, 0.75)'
            : 'rgba(255, 255, 255, 0.45)',
          colorText: isLightTheme ? '#000000' : 'rgba(255, 255, 255, 0.65)',
        },
        components: {
          Descriptions: {
            colorSplit: isLightTheme
              ? 'rgba(5, 5, 5, 0.06)'
              : 'rgba(255, 255, 255, 0.25)',
            titleColor: isLightTheme ? '#000000' : 'rgba(255, 255, 255, 0.65)',
            contentColor: isLightTheme
              ? '#000000'
              : 'rgba(255, 255, 255, 0.65)',
            extraColor: isLightTheme ? '#000000' : 'rgba(255, 255, 255, 0.65)',
            labelBg: isLightTheme
              ? 'rgba(210, 154, 218, 0.1)'
              : 'rgba(210, 154, 218, 0.1)',
          },
        },
      }}
    >
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
    </ConfigProvider>
  )
}

export default AnimeBigCard
