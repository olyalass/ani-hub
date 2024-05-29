import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { StateType } from '../types'

export const useTypedSelector: TypedUseSelectorHook<StateType> = useSelector
