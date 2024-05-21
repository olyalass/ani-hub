import { Link } from 'react-router-dom'

import { DispatchType } from '../types'
import { clearMultiFilters } from '../redux/actionCreators'

function createNavItems(dispatch: DispatchType) {
  return [
    { key: '/', label: <Link to="/">Home</Link> },
    {
      key: '/search',
      label: (
        <Link to="/search" onClick={() => dispatch(clearMultiFilters())}>
          Search
        </Link>
      ),
    },
    { key: '/lists', label: <Link to="/lists">My Lists</Link> },
    { key: '/random', label: <Link to="/random">Random</Link> },
  ]
}

export default createNavItems
