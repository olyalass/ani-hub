import { Content, Footer, Header } from 'antd/es/layout/layout'
import { SunOutlined, MoonOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router'
import { Link } from 'react-router-dom'
import './App.css'
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
import { MenuDividerType } from 'antd/es/menu/hooks/useItems'
import Home from './components/Home'
import ratings from './shared/raitings'

const divider: MenuDividerType = { type: 'divider' }

const navItems = [
  { key: '/', label: <Link to="/">Home</Link> },
  { key: '/top', label: <Link to="/top">Top 100</Link> },
  { key: '/genres', label: <Link to="/genres">Genres</Link> },
  { key: '/random', label: <Link to="/random">Random</Link> },
]

const rootSubmenuKeys = ['rating', 'genres']

//вынести за пределы компонента
// const isSystemThemeLight = window.matchMedia(
//   '(prefers-color-scheme: light)',
// ).matches

function App() {
  const isSystemThemeLight = window.matchMedia(
    '(prefers-color-scheme: light)',
  ).matches
  const [isLightTheme, setIsLightTheme] = useState(isSystemThemeLight)
  const [genres, setGenres] = useState([])
  const [openKeys, setOpenKeys] = useState(['rating'])
  const onOpenChange = (keys: string[]) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1)
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys)
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
    }
  }

  useEffect(() => {
    fetch('https://corsproxy.io/?https://api.jikan.moe/v4/genres/anime')
      .then((response) => (response.ok ? response.json() : []))
      .then((data) => {
        // Определить тип для жанра
        const genresArr = data.data.map((item: { name: string }) => {
          return { label: item.name, key: item.name }
        })
        // жанры тоже вынести в redux store
        setGenres(genresArr)
      })
  }, [])

  return (
    // тему и ConfigProvider вынести в main.tsx
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#d29ada',
          colorSuccess: '#8ae1c0',
          colorWarning: '#f7c180',
          colorError: '#fa8788',
          borderRadius: 9,
          fontSizeHeading1: 24,
          colorBgBase: isLightTheme ? '#f9f9f9' : '#26272d',
          colorLink: '#d29ada',
          colorLinkHover: '#F593F5',
        },
        components: { Switch: { trackMinWidth: 60 } },
      }}
    >
      <Layout style={{ minHeight: '100vh' }}>
        <Header
          style={{
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
          <Flex
            align="center"
            style={{
              width: '90%',
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
          <Sider theme={isLightTheme ? 'light' : 'dark'}>
            <Menu
              mode="inline"
              theme={isLightTheme ? 'light' : 'dark'}
              onOpenChange={onOpenChange}
              items={[
                { label: 'Rating', key: 'rating', children: ratings },
                divider, // { type: 'divider' }, убрать константу divider
                {
                  label: 'Genres',
                  key: 'genres',
                  children: genres,
                },
              ]}
              openKeys={openKeys}
              defaultOpenKeys={openKeys}
            />
          </Sider>
          <Content style={{ padding: '30px 20px 0' }}>
            <Routes>
              <Route path="/" element={<Home isLightTheme={isLightTheme} />} />
            </Routes>
            <Footer
              style={{
                paddingTop: '40px',
                marginLeft: 'auto',
                width: '300px',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <a>Contacts</a>
              <a href="https://jikan.moe">API Source</a>
            </Footer>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  )
}

export default App
