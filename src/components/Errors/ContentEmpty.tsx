import { FrownOutlined } from '@ant-design/icons'

function ContentEmpty({ type }: { type: 'byId' | 'byFilters' | 'byList' }) {
  let message = ''
  if (type === 'byFilters') {
    message = "Sorry, there're no animes with these parametres"
  } else if (type === 'byId') {
    message = "Sorry, anime with this ID doesn't exist"
  } else if (type === 'byList') {
    message = 'This list is empty'
  }
  return (
    <div className="icon-container">
      <FrownOutlined className="icon" />
      <p className="icon-message">{message}</p>
    </div>
  )
}

export default ContentEmpty
