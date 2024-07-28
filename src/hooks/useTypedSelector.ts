import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { RootState } from '../redux/reducer'

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
