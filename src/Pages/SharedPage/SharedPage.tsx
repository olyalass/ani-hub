import { Button, Input, Modal, Pagination, Tooltip } from 'antd'
import { Content } from 'antd/es/layout/layout'
import { useDispatch } from 'react-redux'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router'

import { postNewList, requestListAnimeData } from '../../redux/slices'
import { usePageResize, useTypedSelector } from '../../hooks'
import { AnimeCard } from '../../components'
import { DispatchType } from '../../types'
import { determineCardsAmountByViewport, verifyNewListName } from '../../utils'

const initialCardsAmount = determineCardsAmountByViewport()

export function SharedPage() {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const ids = searchParams.get('ids')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newListName, setNewListName] = useState('')
  const [warningMessage, setWarningMessage] = useState('')
  const [isNewNameInvalid, setIsNewNameInvalid] = useState(false)
  const lists = useTypedSelector((state) => state.lists.lists)
  const dispatch: DispatchType = useDispatch()
  const cardsData = useTypedSelector((state) => state.lists.currListAnimeCards)
  const [currPage, setCurrPage] = useState(1)
  const [cardsAmount, setCardsAmount] = useState(initialCardsAmount + 2)
  const totalIds: number[] = useMemo(
    () => (ids ? ids.split(',').map((id) => Number(id)) : []),
    [ids],
  )
  const currIds = useMemo(
    () =>
      totalIds
        ? totalIds.slice((currPage - 1) * cardsAmount, currPage * cardsAmount)
        : [],
    [totalIds, cardsAmount, currPage],
  )

  const onListCreate = useCallback(() => {
    const trimmedName = newListName.trim()
    const verification = verifyNewListName(trimmedName, Object.keys(lists))
    if (verification.isValid) {
      setIsNewNameInvalid(false)
      dispatch(postNewList(trimmedName, totalIds))
      setIsModalOpen(false)
    } else {
      setIsNewNameInvalid(true)
      setWarningMessage(verification.message)
    }
  }, [newListName, dispatch, totalIds, lists])

  useEffect(() => {
    if (currIds) {
      dispatch(requestListAnimeData(currIds))
    }
  }, [currIds, dispatch])

  const onResize = useCallback((cardsPerPage: number) => {
    setCardsAmount(cardsPerPage + 2)
    setCurrPage(1)
  }, [])

  usePageResize(onResize)

  return (
    <Content className="content-container">
      <Modal
        open={isModalOpen}
        title="Save as new list"
        onCancel={() => {
          setIsModalOpen(false)
          setNewListName('')
        }}
        onOk={onListCreate}
      >
        <Tooltip open={isNewNameInvalid} title={warningMessage}>
          <Input
            placeholder="New list name"
            value={newListName}
            onChange={(e) => {
              const { value } = e.target
              const isValid = /^[a-zA-Z0-9 ]*$/.test(value)
              if (isValid) {
                const formatedName =
                  e.target.value[0].toUpperCase() + e.target.value.substring(1)
                setNewListName(formatedName)
              }
            }}
            onKeyDown={(e) => e.stopPropagation()}
            onPressEnter={onListCreate}
          />
        </Tooltip>
      </Modal>
      <Button onClick={() => setIsModalOpen(true)}>Save shared list</Button>
      <div className="content-wrap">
        {cardsData &&
          cardsData.map((card) => (
            <AnimeCard key={card.id} cardData={card} isDeletable={false} />
          ))}
      </div>
      <Pagination
        showSizeChanger={false}
        current={currPage}
        onChange={(value) => {
          setCurrPage(value)
        }}
        total={totalIds ? totalIds.length : 1}
        pageSize={cardsAmount}
        hideOnSinglePage={true}
      />
    </Content>
  )
}
