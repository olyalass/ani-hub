import { FrownOutlined } from '@ant-design/icons'

function ContentEmpty({
  type,
}: {
  type: 'byId' | 'byFilters' | 'byList' | 'noList'
}) {
  let message = ''
  switch (type) {
    case 'byFilters':
      message = "Sorry, there're no animes with these parametres"
      break
    case 'byId':
      message = "This page doesn't exist"
      break
    case 'byList':
      message = 'This list is empty'
      break
    case 'noList':
      message = 'Choose a list to see saved animes'
      break
    default:
      message = 'Empty page'
  }

  return (
    <div className="icon-container">
      {type !== 'noList' && <FrownOutlined className="icon" />}
      <p className="icon-message">{message}</p>
    </div>
  )
}

export default ContentEmpty
