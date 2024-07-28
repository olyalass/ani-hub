import { Header } from 'antd/es/layout/layout'
import { SunOutlined, MoonOutlined } from '@ant-design/icons'
import { ConfigProvider, Layout, Input, Space, Menu, Switch } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import './App.css'
import { getAppStyleUpgrades } from './antdStyleUpgrades'
import { ThemeContext } from './shared'
import { DispatchType } from './types'
import {
  HomePage,
  SearchPage,
  RandomAnimePage,
  AnimeByIdPage,
  ListsPage,
} from './pages'
import { requestLists, requestGenres, clearHomeFilters } from './redux/slices'
import { createNavItems } from './utils'
import { SharedPage } from './pages/SharedPage'
const isSystemThemeLight = window.matchMedia(
  '(prefers-color-scheme: light)',
).matches

function App() {
  const [isLightTheme, setIsLightTheme] = useState(isSystemThemeLight)
  const [searchValue, setSearchValue] = useState('')
  const dispatch: DispatchType = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    dispatch(requestGenres())
    dispatch(requestLists())
  }, [dispatch])

  function onSearch(value: string) {
    navigate('/search/q=' + value)
    setSearchValue('')
  }

  const onHomePageClick = useCallback(() => {
    dispatch(clearHomeFilters)
  }, [dispatch])

  return (
    <ThemeContext.Provider value={isLightTheme}>
      <ConfigProvider theme={getAppStyleUpgrades(isLightTheme)}>
        <Layout style={{ minHeight: '100vh' }}>
          <Header className="header">
            <div className="header-container">
              <Link to="/">
                <h1 className="app-title">Anime Universe</h1>
              </Link>
              <div className="nav">
                <Space.Compact size="middle" className="search-container">
                  <Input.Search
                    placeholder="input anime title"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onSearch={onSearch}
                  />
                </Space.Compact>
                <Menu
                  mode="horizontal"
                  theme="dark"
                  items={createNavItems(onHomePageClick)}
                  selectedKeys={['/' + location.pathname.split('/')[1]]}
                />
              </div>
              <Switch
                style={{ marginLeft: '20px' }}
                checkedChildren={<SunOutlined />}
                unCheckedChildren={<MoonOutlined />}
                defaultChecked={isLightTheme}
                onChange={() => setIsLightTheme(!isLightTheme)}
              />
            </div>
          </Header>
          <Layout style={{ width: '100vw' }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/search/:filters" element={<SearchPage />} />
              <Route path="/random" element={<RandomAnimePage />} />
              <Route path="/:id" element={<AnimeByIdPage />} />
              <Route path="/lists" element={<ListsPage />} />
              <Route path="/lists/:listname" element={<ListsPage />} />
              <Route path="/shared" element={<SharedPage />} />
            </Routes>
          </Layout>
        </Layout>
      </ConfigProvider>
    </ThemeContext.Provider>
  )
}

export default App
