import { useCallback, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Menu } from 'antd'

import ratings from '../../shared/raitings'
import { StateType } from '../../types'
import { clearFilters, setMonoFilter } from '../../redux/actionCreators'

const rootSubmenuKeys = ['rating', 'genres']

type Props = {
  isLightTheme: boolean
}

function HomeMenu({ isLightTheme }: Props) {
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
        dispatch(setMonoFilter(key, 'rating'))
      } else if (keyPath.includes('genres')) {
        dispatch(setMonoFilter(key, 'genres'))
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
