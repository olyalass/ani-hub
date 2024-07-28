import { Menu, Input, Tooltip, Modal } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { useContext, useEffect, useLayoutEffect, useState } from 'react'

import { ThemeContext } from '../../shared'
import { verifyNewListName } from '../../utils'
import { useTypedSelector } from '../../hooks'
import { useDispatch } from 'react-redux'
import { deleteList, postNewList } from '../../redux/slices'
import { DeleteOutlined } from '@ant-design/icons'
import { DispatchType } from '../../types'
import { useNavigate, useParams } from 'react-router'

const blankMenuItem = {
  key: 'blank',
  label: <div />,
}

function ListsMenu() {
  const { listname } = useParams()
  const navigate = useNavigate()
  const dispatch: DispatchType = useDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [clickedDeleteList, setClickedDeleteList] = useState(
    null as null | string,
  )
  const isLightTheme = useContext(ThemeContext)
  const storedLists = useTypedSelector((state) => state.lists.lists)
  const [newListName, setNewListName] = useState('')
  const [listNames, setListNames] = useState(['add'])
  const [isNewNameInvalid, setIsNewNameInvalid] = useState(false)
  const [warningMessage, setWarningMessage] = useState(
    'Please, write a list name',
  )
  const [menuItems, setMenuItems] = useState([blankMenuItem])

  useEffect(() => {
    setListNames(['add', ...Object.keys(storedLists)])
  }, [storedLists])

  useLayoutEffect(() => {
    const items: { key: string; label: JSX.Element }[] = listNames.map(
      (item) => {
        const obj = { key: item, label: <div></div> }
        switch (item) {
          case 'input':
            obj.label = (
              <Tooltip open={isNewNameInvalid} title={warningMessage}>
                <Input.Search
                  autoFocus
                  enterButton="create"
                  value={newListName}
                  onChange={(e) => {
                    const { value } = e.target
                    const isValid = /^[a-zA-Z0-9 ]*$/.test(value)
                    if (isValid) {
                      const formatedName =
                        e.target.value[0].toUpperCase() +
                        e.target.value.substring(1)
                      setNewListName(formatedName)
                      setIsNewNameInvalid(false)
                    }
                  }}
                  onSearch={() => {
                    const trimmedName = newListName.trim()
                    const verification = verifyNewListName(
                      trimmedName,
                      listNames,
                    )
                    if (verification.isValid) {
                      setIsNewNameInvalid(false)
                      setListNames(
                        [...listNames].splice(0, 1, 'add', trimmedName),
                      )
                      dispatch(postNewList(trimmedName))
                      navigate('/lists/' + trimmedName)
                    } else {
                      setIsNewNameInvalid(true)
                      setWarningMessage(verification.message)
                    }
                  }}
                />
              </Tooltip>
            )
            break
          case 'add':
            obj.label = (
              <div
                onClick={() => {
                  const updlistNames = [...listNames]
                  updlistNames.splice(0, 1, 'input')
                  setListNames(updlistNames)
                }}
              >
                Create new list +
              </div>
            )
            break
          default:
            obj.label = (
              <div
                style={{ display: 'flex', justifyContent: 'space-between' }}
                onClick={() => {
                  const updlistNames = [...listNames]
                  updlistNames.splice(0, 1, 'add')
                  setListNames(updlistNames)
                  navigate('/lists/' + item)
                }}
              >
                {item}
                <span title="delete list">
                  <DeleteOutlined
                    onClick={() => {
                      setIsModalOpen(true)
                      setClickedDeleteList(item)
                    }}
                  />
                </span>
              </div>
            )
        }
        return obj
      },
      [],
    )
    setMenuItems(items)
  }, [
    listNames,
    warningMessage,
    isNewNameInvalid,
    dispatch,
    navigate,
    newListName,
  ])
  return (
    <>
      {' '}
      <Modal
        open={isModalOpen}
        title="Are you sure you want to delete this list?"
        onOk={() => {
          if (clickedDeleteList) {
            dispatch(deleteList(clickedDeleteList))
            navigate('/lists')
          }
          setIsModalOpen(false)
          setClickedDeleteList(null)
        }}
        onCancel={() => {
          setIsModalOpen(false)
          setClickedDeleteList(null)
        }}
      />
      <Sider
        theme={isLightTheme ? 'light' : 'dark'}
        style={{ paddingTop: '15px', minHeight: 'calc(100vh - 64px)' }}
      >
        <Menu
          theme={isLightTheme ? 'light' : 'dark'}
          items={menuItems}
          selectedKeys={listname ? [listname] : []}
        ></Menu>
      </Sider>
    </>
  )
}

export default ListsMenu
