import { Menu } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

function GenresLoading() {
  return (
    <Menu.Item key="loading">
      <LoadingOutlined />
    </Menu.Item>
  )
}

export default GenresLoading
