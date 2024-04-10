import { Content, Header } from 'antd/es/layout/layout'
import { SunOutlined, MoonOutlined } from '@ant-design/icons'
import {
  ConfigProvider,
  Layout,
  Input,
  Typography,
  Space,
  Menu,
  Flex,
  Switch,
} from 'antd'
import Sider from 'antd/es/layout/Sider'
import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Dispatch } from 'redux'

import './App.css'
import Home from './components/Home'
import { getAppStyleUpgrades } from './antdStyleUpgrades'
import { updateGenresList } from './redux/actionCreators'
import HomeMenu from './components/Sider/HomeMenu'
import requestGenres from './api/requests/requestGenres'
import parseGenre from './api/parsers/parseGenre'

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
  const dispatch: Dispatch = useDispatch()

  useEffect(() => {
    requestGenres().then((genres) =>
      dispatch(updateGenresList(genres.map(parseGenre))),
    )
  }, [dispatch])

  return (
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
            <Typography.Title
              style={{
                marginTop: '0px',
                marginBottom: '0px',
                marginRight: '50px',
                color: 'rgba(255, 255, 255, 0.65)',
                cursor: 'default',
              }}
            >
              Anime Universe
            </Typography.Title>
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
              <Menu mode="horizontal" theme="dark" items={navItems}></Menu>
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
          <Sider theme={isLightTheme ? 'light' : 'dark'}>
            <Routes>
              <Route
                path="/"
                element={<HomeMenu isLightTheme={isLightTheme} />}
              />
            </Routes>
          </Sider>
          <Content style={{ padding: '30px 20px 0' }}>
            <Routes>
              <Route path="/" element={<Home isLightTheme={isLightTheme} />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  )
}

export default App
