import { Content, Header } from 'antd/es/layout/layout'
import { SunOutlined, MoonOutlined } from '@ant-design/icons'
import { ConfigProvider, Layout, Input, Space, Menu, Flex, Switch } from 'antd'
import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import './App.css'
import Home from './components/Home'
import { getAppStyleUpgrades } from './antdStyleUpgrades'
import HomeMenu from './components/Sider/HomeMenu'
import requestGenres from './redux/thunk/requestGenres'
import ThemeContext from './shared/ThemeContext'
import { DispatchType } from './types'
import Search from './components/Search'
import SearchForm from './components/Sider/SearchForm'
import RandomPage from './components/RandomPage'
import IdPage from './components/IdPage'

const navItems = [
  { key: '/', label: <Link to="/">Home</Link> },
  { key: '/search', label: <Link to="/top">Search</Link> },
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
          <Header
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              padding: 0,
            }}
          >
            <Flex
              align="center"
              style={{
                width: 'calc(100vw - 60px)',
                rowGap: '20px',
              }}
            >
              <h1 className="app-title">Anime Universe</h1>
              <Flex
                align="center"
                style={{
                  flexGrow: 1,
                  justifyContent: 'space-between',
                }}
              >
                <Space.Compact size="middle">
                  <Input.Search></Input.Search>
                </Space.Compact>
                <Menu mode="horizontal" theme="dark" items={navItems} />
              </Flex>
              <Switch
                style={{ marginLeft: '20px' }}
                checkedChildren={<SunOutlined />}
                unCheckedChildren={<MoonOutlined />}
                defaultChecked={isLightTheme}
                onChange={() => setIsLightTheme(!isLightTheme)}
              />
            </Flex>
          </Header>
          <Layout>
            <Routes>
              <Route path="/" element={<HomeMenu />} />
              <Route path="/search" element={<SearchForm />} />
            </Routes>
            <Content style={{ padding: '2vh 2vw' }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/random" element={<RandomPage />} />
                <Route path="/search" element={<Search />} />
                <Route path="/:id" element={<IdPage />} />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </ConfigProvider>
    </ThemeContext.Provider>
  )
}

export default App
