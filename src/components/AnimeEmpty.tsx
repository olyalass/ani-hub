import { Flex } from 'antd'
import { FrownOutlined } from '@ant-design/icons'

function AnimeEmpty() {
  return (
    <Flex
      vertical={true}
      align="center"
      style={{
        position: 'absolute',
        top: '47vh',
      }}
    >
      <FrownOutlined
        style={{
          color: '#d29ada',
          fontSize: '40px',
        }}
      />
      <p style={{ color: '#d29ada' }}>
        Sorry, we didn't find any animes with these parametres
      </p>
    </Flex>
  )
}

export default AnimeEmpty
