import { Link } from 'react-router-dom'

function createNavItems(onSearchClick: () => void) {
  return [
    { key: '/', label: <Link to="/">Home</Link> },
    {
      key: '/search',
      label: (
        <Link to="/search" onClick={onSearchClick}>
          Search
        </Link>
      ),
    },
    { key: '/lists', label: <Link to="/lists">My Lists</Link> },
    { key: '/random', label: <Link to="/random">Random</Link> },
  ]
}

export default createNavItems
