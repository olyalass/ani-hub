import { useContext, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Menu } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { Header } from 'antd/es/layout/layout'

import {
  clearHomeFilters,
  setGenreToHomeFilters,
  setRatingToHomeFilters,
} from '../../redux/slices'
import { ThemeContext, SizeContext, ratings } from '../../shared'
import { GenresError, GenresLoading } from '../../components'
import { useTypedSelector } from '../../hooks'

const rootSubmenuKeys = ['rating', 'genres']

function HomeMenu() {
  const isLoading = useTypedSelector((state) => state.genres.isLoading)
  const isError = useTypedSelector((state) => state.genres.isError)
  const genres = useTypedSelector((state) => state.genres.genres)
  const isLightTheme = useContext(ThemeContext)
  const isNarrowScreen = useContext(SizeContext)

  const [openKeys, setOpenKeys] = useState(isNarrowScreen ? [] : ['rating'])
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
      dispatch(setRatingToHomeFilters(key))
    } else if (keyPath.includes('genres')) {
      dispatch(setGenreToHomeFilters(key))
    } else {
      dispatch(clearHomeFilters())
      setOpenKeys([])
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
    <>
      {!isNarrowScreen && (
        <Sider className="home-sider" theme={isLightTheme ? 'light' : 'dark'}>
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
      )}
      {isNarrowScreen && (
        <Header style={{ padding: 0 }}>
          <Menu
            mode="horizontal"
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
        </Header>
      )}
    </>
  )
}

export default HomeMenu
