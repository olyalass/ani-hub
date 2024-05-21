import { Header } from 'antd/es/layout/layout'
import { SunOutlined, MoonOutlined } from '@ant-design/icons'
import { ConfigProvider, Layout, Input, Space, Menu, Switch } from 'antd'
import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import './App.css'
import HomePage from './components/Pages/HomePage'
import { getAppStyleUpgrades } from './antdStyleUpgrades'
import requestGenres from './redux/thunk/requestGenres'
import ThemeContext from './shared/ThemeContext'
import { DispatchType } from './types'
import SearchPage from './components/Pages/SearchPage'
import RandomAnimePage from './components/Pages/RandomAnimePage'
import AnimeByIdPage from './components/Pages/AnimeByIdPage'
import { setQToMultiFilters } from './redux/actionCreators'
import createNavItems from './utils/createNavItems'

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
  }, [dispatch])

  function onSearch(value: string) {
    dispatch(setQToMultiFilters(value))
    navigate('/search')
    setSearchValue('')
  }

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
                <Space.Compact size="middle">
                  <Input.Search
                    placeholder="input anime title"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onSearch={onSearch}
                  ></Input.Search>
                </Space.Compact>
                <Menu
                  mode="horizontal"
                  theme="dark"
                  items={createNavItems(dispatch)}
                  defaultSelectedKeys={[location.pathname]}
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
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/random" element={<RandomAnimePage />} />
              <Route path="/:id" element={<AnimeByIdPage />} />
            </Routes>
          </Layout>
        </Layout>
      </ConfigProvider>
    </ThemeContext.Provider>
  )
}

export default App
