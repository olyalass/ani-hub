import { useContext, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Menu } from 'antd'
import Sider from 'antd/es/layout/Sider'

import { ratings } from '../../shared/raitings'
import {
  clearFilters,
  setMonoGenre,
  setMonoRating,
} from '../../redux/actionCreators'
import ThemeContext from '../../shared/ThemeContext'
import GenresError from '../../components/Errors/GenresError'
import GenresLoading from '../../components/Loadings/GenresLoading'
import { useTypedSelector } from '../../utils/hooks/useTypedSelector'

const rootSubmenuKeys = ['rating', 'genres']

function HomeMenu() {
  const isLoading = useTypedSelector((state) => state.isLoadingGenres)
  const isError = useTypedSelector((state) => state.isGenresError)
  const genres = useTypedSelector((state) => state.genres)
  const isLightTheme = useContext(ThemeContext)
  const [openKeys, setOpenKeys] = useState(['rating'])
  const dispatch = useDispatch()

  const onOpenChange = (keys: string[]) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1)
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys)
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
    }
  }

  const handleMenuClick = ({
    key,
    keyPath,
  }: {
    key: string
    keyPath: string[]
  }) => {
    if (keyPath.includes('rating')) {
      dispatch(setMonoRating(key))
    } else if (keyPath.includes('genres')) {
      dispatch(setMonoGenre(key))
    } else {
      dispatch(clearFilters())
    }
  }

  let content = null
  if (isError) {
    content = <GenresError />
  } else if (isLoading) {
    content = <GenresLoading />
  } else {
    content = genres.map((genre) => (
      <Menu.Item key={genre.key}>{genre.label}</Menu.Item>
    ))
  }

  return (
    <Sider theme={isLightTheme ? 'light' : 'dark'}>
      <Menu
        mode="inline"
        theme={isLightTheme ? 'light' : 'dark'}
        onOpenChange={onOpenChange}
        onClick={handleMenuClick}
        openKeys={openKeys}
        defaultOpenKeys={openKeys}
        defaultSelectedKeys={['clear']}
      >
        <Menu.Item key="clear">No filters</Menu.Item>
        <Menu.SubMenu key="rating" title="Rating">
          {ratings.map((item) => (
            <Menu.Item key={item.key}>{item.label}</Menu.Item>
          ))}
        </Menu.SubMenu>
        <Menu.SubMenu key="genres" title="Genres">
          {content}
        </Menu.SubMenu>
      </Menu>
    </Sider>
  )
}

export default HomeMenu
