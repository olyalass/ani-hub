import { Header } from 'antd/es/layout/layout'
import { SunOutlined, MoonOutlined, HomeOutlined } from '@ant-design/icons'
import {
  ConfigProvider,
  Layout,
  Input,
  Space,
  Menu,
  Switch,
  Breadcrumb,
} from 'antd'
import { useEffect, useState } from 'react'
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
import { requestLists, requestGenres } from './redux/slices'
import { SharedPage } from './pages/SharedPage'
import { burgerNavItems, navItems } from './utils/createNavItems'
import { SizeContext } from './shared/SizeContext'
const isSystemThemeLight = window.matchMedia(
  '(prefers-color-scheme: light)',
).matches

function App() {
  const [isLightTheme, setIsLightTheme] = useState(isSystemThemeLight)
  const [searchValue, setSearchValue] = useState('')
  const dispatch: DispatchType = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const breadItems = location.pathname
    .split('/')
    .slice(1)
    .map((i) => ({
      key: i,
      title: (
        <Link to={'/' + i}>
          {i ? i[0].toUpperCase() + i.substring(1) : null}
        </Link>
      ),
    }))

  const [isNarrowScreen, setIsNarrowScreen] = useState(
    window.matchMedia('(max-width: 720px)').matches,
  )
  useEffect(() => {
    function handleResize() {
      setIsNarrowScreen(window.matchMedia('(max-width: 720px)').matches)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    dispatch(requestGenres())
    dispatch(requestLists())
  }, [dispatch])

  function onSearch(value: string) {
    navigate('/search?q=' + value)
    setSearchValue('')
  }

  return (
    <SizeContext.Provider value={isNarrowScreen}>
      <ThemeContext.Provider value={isLightTheme}>
        <ConfigProvider theme={getAppStyleUpgrades(isLightTheme)}>
          <Layout
            style={{ minHeight: '100vh', width: '100vw', overflowX: 'hidden' }}
          >
            <Header className="header">
              <div className="header-container">
                <Link to="/">
                  <h1 className="app-title">AniHub</h1>
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
                  {!isNarrowScreen && (
                    <Menu
                      className="nav-menu"
                      mode="horizontal"
                      theme="dark"
                      items={navItems}
                      selectedKeys={['/' + location.pathname.split('/')[1]]}
                    />
                  )}
                </div>
                {isNarrowScreen && (
                  <Menu
                    className="nav-menu"
                    mode="vertical"
                    theme="dark"
                    items={burgerNavItems}
                    selectedKeys={['/' + location.pathname.split('/')[1]]}
                  />
                )}
                <Switch
                  style={{ marginLeft: '20px' }}
                  checkedChildren={<SunOutlined />}
                  unCheckedChildren={<MoonOutlined />}
                  defaultChecked={isLightTheme}
                  onChange={() => setIsLightTheme(!isLightTheme)}
                />
              </div>
            </Header>
            {isNarrowScreen && (
              <Header
                style={{
                  height: 'fit-content',
                  paddingLeft: '15px',
                  paddingTop: '5px',
                  backgroundColor: isLightTheme ? '#f9f9f9' : '#001529',
                }}
              >
                <Breadcrumb
                  items={
                    breadItems
                      ? [
                          {
                            key: '/',
                            title: (
                              <Link to="/">
                                <HomeOutlined />
                              </Link>
                            ),
                          },
                        ].concat(breadItems)
                      : [
                          {
                            key: '/',
                            title: (
                              <Link to="/">
                                <HomeOutlined />
                              </Link>
                            ),
                          },
                        ]
                  }
                />
              </Header>
            )}
            <Layout style={{ width: '100vw' }}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/search" element={<SearchPage />} />
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
    </SizeContext.Provider>
  )
}

export default App
