import { Menu, Input, Tooltip, Modal, Select, Button } from 'antd'
import { Header } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
import { DeleteOutlined } from '@ant-design/icons'
import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useDispatch } from 'react-redux'

import { ThemeContext, SizeContext } from '../../shared'
import { verifyNewListName } from '../../utils'
import { useTypedSelector } from '../../hooks'
import { deleteList, postNewList } from '../../redux/slices'
import { DispatchType } from '../../types'

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
  const isNarrowScreen = useContext(SizeContext)
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

  useEffect(() => {
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
                      setNewListName(value)
                      setIsNewNameInvalid(false)
                    } else {
                      setIsNewNameInvalid(true)
                      setWarningMessage('a-z A-Z 0-9 symbols only')
                      setTimeout(() => setIsNewNameInvalid(false), 2000)
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
      {!isNarrowScreen && (
        <Sider theme={isLightTheme ? 'light' : 'dark'} className="lists-sider">
          <Menu
            theme={isLightTheme ? 'light' : 'dark'}
            items={menuItems}
            selectedKeys={listname ? [listname] : []}
          ></Menu>
        </Sider>
      )}
      {isNarrowScreen && (
        <Header
          style={{
            width: '100vw',
            display: 'flex',
            flexWrap: 'wrap',
            columnGap: '20px',
            alignItems: 'center',
            height: 'fit-content',
            padding: '15px',
            backgroundColor: isLightTheme
              ? 'rgba(255, 255, 255, 0.65)'
              : '#001529',
          }}
        >
          <label>
            Choose the list:
            <Select
              style={{ marginLeft: '10px', minWidth: '100px' }}
              value={listname}
              onChange={(value) => {
                navigate('/lists/' + value)
              }}
              options={Object.keys(storedLists).map((list) => ({
                value: list,
                key: list,
                label: list,
              }))}
            />
          </label>
          <Tooltip open={isNewNameInvalid} title={warningMessage}>
            <Input.Search
              style={{ maxWidth: '170px' }}
              placeholder="Create new list"
              title="create new list"
              enterButton="+"
              value={newListName}
              onChange={(e) => {
                const { value } = e.target
                const isValid = /^[a-zA-Z0-9 ]*$/.test(value)
                if (isValid) {
                  setNewListName(value)
                  setIsNewNameInvalid(false)
                } else {
                  setIsNewNameInvalid(true)
                  setWarningMessage('a-z A-Z 0-9 symbols only')
                  setTimeout(() => setIsNewNameInvalid(false), 2000)
                }
              }}
              onSearch={() => {
                const trimmedName = newListName.trim()
                const verification = verifyNewListName(trimmedName, listNames)
                if (verification.isValid) {
                  setIsNewNameInvalid(false)
                  setListNames([...listNames].splice(0, 1, 'add', trimmedName))
                  dispatch(postNewList(trimmedName))
                  navigate('/lists/' + trimmedName)
                } else {
                  setIsNewNameInvalid(true)
                  setWarningMessage(verification.message)
                }
              }}
            />
          </Tooltip>
          {listname && (
            <Button
              onClick={() => {
                setClickedDeleteList(listname)
                setIsModalOpen(true)
              }}
            >
              Delete list
            </Button>
          )}
        </Header>
      )}
    </>
  )
}

export default ListsMenu
