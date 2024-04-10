import { useCallback, useContext, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Menu } from 'antd'

import ratings from '../../shared/raitings'
import { StateType } from '../../types'
import {
  clearFilters,
  setMonoGenre,
  setMonoRating,
} from '../../redux/actionCreators'
import ThemeContext from '../../shared/ThemeContext'

const rootSubmenuKeys = ['rating', 'genres']

function HomeMenu() {
  const isLightTheme = useContext(ThemeContext)
  const [openKeys, setOpenKeys] = useState(['rating'])
  const genres = useSelector((state: StateType) => state.genres)
  const dispatch = useDispatch()
  const onOpenChange = (keys: string[]) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1)
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys)
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
    }
  }
  const handleMenuClick = useCallback(
    ({ key, keyPath }: { key: string; keyPath: string[] }) => {
      if (keyPath.includes('rating')) {
        dispatch(setMonoRating(key))
      } else if (keyPath.includes('genres')) {
        dispatch(setMonoGenre(key))
      } else {
        dispatch(clearFilters())
      }
    },
    [dispatch],
  )

  return (
    <Menu
      mode="inline"
      theme={isLightTheme ? 'light' : 'dark'}
      onOpenChange={onOpenChange}
      onClick={handleMenuClick}
      items={[
        { label: 'No filters', key: 'clear' },
        { label: 'Rating', key: 'rating', children: ratings },
        { type: 'divider' },
        {
          label: 'Genres',
          key: 'genres',
          children: genres,
          style: {
            maxHeight: 'calc(100vh - 148px)',
            overflow: 'scroll',
          },
        },
      ]}
      openKeys={openKeys}
      defaultOpenKeys={openKeys}
      defaultSelectedKeys={['clear']}
    />
  )
}

export default HomeMenu
