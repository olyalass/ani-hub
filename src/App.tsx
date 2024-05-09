import { Header } from 'antd/es/layout/layout'
import { SunOutlined, MoonOutlined } from '@ant-design/icons'
import { ConfigProvider, Layout, Input, Space, Menu, Switch } from 'antd'
import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router'
import { Link } from 'react-router-dom'
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

const navItems = [
  { key: '/', label: <Link to="/">Home</Link> },
  { key: '/search', label: <Link to="/search">Search</Link> },
  { key: '/lists', label: <Link to="/lists">My Lists</Link> },
  { key: '/random', label: <Link to="/random">Random</Link> },
]

const isSystemThemeLight = window.matchMedia(
  '(prefers-color-scheme: light)',
).matches

function App() {
  const [isLightTheme, setIsLightTheme] = useState(isSystemThemeLight)
  const dispatch: DispatchType = useDispatch()

  useEffect(() => {
    dispatch(requestGenres())
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
                <Space.Compact size="middle">
                  <Input.Search></Input.Search>
                </Space.Compact>
                <Menu mode="horizontal" theme="dark" items={navItems} />
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
