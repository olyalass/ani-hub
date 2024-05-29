import { FrownOutlined } from '@ant-design/icons'
import { ReactNode } from 'react'

type Params = {
  children?: ReactNode
}

function ContentError({ children }: Params) {
  return (
    <div className="icon-container">
      <FrownOutlined className="icon" />
      <p className="icon-message">Oops, something went wrong</p>
      {children}
    </div>
  )
}

export default ContentError
