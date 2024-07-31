import { MenuOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

export const navItems = [
  {
    key: '/',
    label: <Link to="/">Home</Link>,
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

export const burgerNavItems = [
  {
    key: 'nav',
    label: <MenuOutlined className="burger-menu" />,
    children: [
      {
        key: '/',
        label: <Link to="/">Home</Link>,
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
    ],
  },
]
