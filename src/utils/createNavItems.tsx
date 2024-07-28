import { Link } from 'react-router-dom'

export function createNavItems(onHomePageClick: () => void) {
  return [
    {
      key: '/',
      label: (
        <Link to="/" onClick={onHomePageClick}>
          Home
        </Link>
      ),
    },
    {
      key: '/search',
      label: <Link to="/search">Search</Link>,
    },
    {
      key: '/lists',
      label: <Link to="/lists">My Lists</Link>,
    },
    {
      key: '/random',
      label: <Link to="/random">Random</Link>,
    },
  ]
}
