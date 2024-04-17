import { Flex } from 'antd'
import { FrownOutlined } from '@ant-design/icons'

function AnimeError() {
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
      <p style={{ color: '#d29ada' }}>Oops, something went wrong</p>
    </Flex>
  )
}

export default AnimeError
