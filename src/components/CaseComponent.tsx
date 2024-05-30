import { ReactNode } from 'react'

type Props = {
  isError: boolean
  isSpinnerActive: boolean
  isEmpty: boolean
  errorElement: ReactNode
  loadingElement: ReactNode
  emptyElement: ReactNode
  children: ReactNode
}

function CaseComponent({
  isError,
  isSpinnerActive,
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

  if (isSpinnerActive) {
    return loadingElement
  }

  return children
}

export default CaseComponent
