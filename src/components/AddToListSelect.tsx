import { PlusOutlined } from '@ant-design/icons'
import { Button, Divider, Input, Select, Space, Tooltip } from 'antd'
import { ChangeEvent, useRef, useState, useEffect } from 'react'
import { verifyNewListName } from '../utils'
import { useTypedSelector } from '../hooks'
import { useDispatch } from 'react-redux'
import { DispatchType } from '../types'
import {
  deleteItemFromList,
  postNewItemToList,
  postNewList,
} from '../redux/slices'

function AddToListSelect({
  isBigCard,
  animeId,
}: {
  isBigCard: boolean
  animeId: number
}) {
  const dispatch: DispatchType = useDispatch()
  const [selected, setSelected] = useState([] as string[])
  const storedLists = useTypedSelector((state) => state.lists.lists)
  const isLoading = useTypedSelector((state) => state.lists.isListsLoading)
  const [listNames, setListNames] = useState(['list1'])
  const [newListName, setNewListName] = useState('')
  const [isNewNameInvalid, setIsNewNameInvalid] = useState(false)
  const [warningMessage, setWarningMessage] = useState(
    'Please, write a list name',
  )
  const inputRef = useRef(null)
  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
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
  }
  const addItem = (
    e:
      | React.MouseEvent<HTMLElement, MouseEvent>
      | React.KeyboardEvent<HTMLInputElement>,
  ) => {
    e.preventDefault()
    const trimmedName = newListName.trim()
    const verification = verifyNewListName(trimmedName, listNames)
    if (verification.isValid) {
      setIsNewNameInvalid(false)
      setListNames([...listNames].splice(0, 1, 'add', trimmedName))
      dispatch(postNewList(trimmedName))
    } else {
      setIsNewNameInvalid(true)
      setWarningMessage(verification.message)
    }
  }

  useEffect(() => {
    const listKeys = Object.keys(storedLists)
    if (listKeys.length > 0) {
      setListNames(listKeys)
    } else {
      setListNames([])
    }
  }, [storedLists, animeId])

  useEffect(() => {
    const selectedLists = listNames.filter((listName) =>
      Array.isArray(storedLists[listName])
        ? storedLists[listName]?.includes(animeId)
        : false,
    )
    setSelected(selectedLists)
  }, [listNames, animeId, storedLists])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (inputRef.current !== event.target) {
        setIsNewNameInvalid(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [inputRef])

  return (
    <Select
      disabled={isLoading}
      className={
        isBigCard
          ? 'add-to-list-select add-to-list-select-right'
          : 'add-to-list-select'
      }
      ref={inputRef.current}
      placeholder="+ Add to list"
      onChange={(value) => {
        setSelected(value)
      }}
      onSelect={(value) => dispatch(postNewItemToList(value, animeId))}
      onDeselect={(value) => dispatch(deleteItemFromList(value, animeId))}
      mode="multiple"
      maxTagCount="responsive"
      showSearch={false}
      value={selected}
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider style={{ margin: '8px 0' }} />
          <Space>
            <Tooltip open={isNewNameInvalid} title={warningMessage}>
              <Input
                placeholder="New list name"
                value={newListName}
                onChange={(e) => onNameChange(e)}
                onKeyDown={(e) => e.stopPropagation()}
                onPressEnter={(e) => {
                  addItem(e)
                }}
              />
            </Tooltip>
            <Button
              type="text"
              icon={<PlusOutlined />}
              onClick={(e) => addItem(e)}
            ></Button>
          </Space>
        </>
      )}
      options={listNames.map((listName) => ({
        value: listName,
        label: listName,
        key: listName,
      }))}
    />
  )
}

export default AddToListSelect
