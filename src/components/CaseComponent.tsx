import { ReactNode } from 'react'

type Props = {
  isError: boolean
  isLoading: boolean
  isEmpty: boolean
  errorElement: ReactNode
  loadingElement: ReactNode
  emptyElement: ReactNode
  children: ReactNode
}

function CaseComponent({
  isError,
  isLoading,
  isEmpty,
  errorElement,
  loadingElement,
  emptyElement,
  children,
}: Props): ReactNode {
  if (isEmpty) {
    return emptyElement
  }

  if (isError) {
    return errorElement
  }

  if (isLoading) {
    return loadingElement
  }

  return children
}

export default CaseComponent
