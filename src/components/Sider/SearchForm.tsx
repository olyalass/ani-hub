import Sider from 'antd/es/layout/Sider'
import { useContext } from 'react'

import ThemeContext from '../../shared/ThemeContext'

function SearchForm() {
  const isLightTheme = useContext(ThemeContext)
  return <Sider theme={isLightTheme ? 'light' : 'dark'}></Sider>
}

export default SearchForm
