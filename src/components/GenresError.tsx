import { Alert, Menu } from 'antd'

function GenresError() {
  return (
    <Menu.Item key="error" style={{ padding: 0 }} disabled={true}>
      <Alert type="error" showIcon message="Couldn't get genres" />
    </Menu.Item>
  )
}

export default GenresError
