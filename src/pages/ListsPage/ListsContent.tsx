import { Content } from 'antd/es/layout/layout'
import { Button, Flex, Input, Modal, Pagination, QRCode } from 'antd'
import { useState, useCallback, useMemo, useLayoutEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'

import {
  CaseComponent,
  ContentError,
  ContentLoading,
  ContentEmpty,
  AnimeCard,
} from '../../components'
import { useTypedSelector, usePageResize } from '../../hooks'
import { createListShareUrl, determineCardsAmountByViewport } from '../../utils'
import { requestListAnimeData } from '../../redux/slices'
import { DispatchType } from '../../types'
import { copyLinkToClipboard } from '../../utils/copyLinkToClipboard'
const initialCardsAmount = determineCardsAmountByViewport()

export function ListsContent() {
  const { listname } = useParams()
  const dispatch: DispatchType = useDispatch()
  const isError = useTypedSelector((state) => state.lists.isCardsDataError)
  const isLoading = useTypedSelector((state) => state.lists.isCardsDataLoading)
  const isEmpty = useTypedSelector((state) => state.lists.isCardsDataEmpty)
  const listAnimes = useTypedSelector((state) => state.lists.currListAnimeCards)
  const isSpinnerActive = !listAnimes || isLoading
  const lists = useTypedSelector((state) => state.lists.lists)
  const [currPage, setCurrPage] = useState(1)
  const [cardsAmount, setCardsAmount] = useState(initialCardsAmount)
  const animeIds = useMemo(
    () =>
      listname && lists[listname] && lists[listname].length > 0
        ? lists[listname]
        : [],
    [listname, lists],
  )
  const shareLink = useMemo(() => createListShareUrl(animeIds), [animeIds])
  const totalPages = useMemo(
    () =>
      listname && lists[listname] && lists[listname].length > 0
        ? Math.ceil(lists[listname].length / cardsAmount)
        : 1,
    [lists, listname, cardsAmount],
  )
  const [isModalOpen, setIsModalOpen] = useState(false)

  useLayoutEffect(() => {
    let ids: number[] = []
    if (animeIds.length) {
      ids = [...animeIds]
    }
    if (animeIds.length > cardsAmount) {
      const start = (currPage - 1) * cardsAmount
      const end = start + cardsAmount
      ids = [...animeIds].slice(start, end)
    }
    dispatch(requestListAnimeData(ids))
  }, [animeIds, currPage, cardsAmount, dispatch])

  const onResize = useCallback((totalCards: number) => {
    setCardsAmount(totalCards)
    setCurrPage(1)
  }, [])

  usePageResize(onResize)
  return (
    <Content className="content-container">
      <Flex vertical={true} justify="center" align="center" gap="middle">
        <CaseComponent
          isError={isError}
          isSpinnerActive={isSpinnerActive}
          isEmpty={isEmpty || listAnimes.length < 0}
          errorElement={<ContentError />}
          loadingElement={<ContentLoading />}
          emptyElement={<ContentEmpty type={listname ? 'byList' : 'noList'} />}
        >
          <div className="content-wrap">
            {listAnimes.map((anime) => (
              <AnimeCard key={anime.id} cardData={anime} isDeletable={true} />
            ))}
          </div>

          <Pagination
            showSizeChanger={false}
            current={currPage}
            onChange={(value) => {
              setCurrPage(value)
            }}
            total={totalPages * cardsAmount}
            pageSize={cardsAmount}
            hideOnSinglePage={true}
          />
          <Button
            onClick={() => {
              setIsModalOpen(true)
            }}
          >
            Share list
          </Button>
          <Modal
            open={isModalOpen}
            onOk={() => {
              copyLinkToClipboard(shareLink)
              setIsModalOpen(false)
            }}
            onCancel={() => {
              setIsModalOpen(false)
            }}
            okText="Copy link"
            closable={false}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              top: '30vh',
            }}
          >
            <QRCode
              value={shareLink}
              color="#d29ada"
              icon="../../../public/kitsune.svg"
            />
            <Input
              value={shareLink}
              onClick={() => copyLinkToClipboard(shareLink)}
            />
          </Modal>
        </CaseComponent>
      </Flex>
    </Content>
  )
}
