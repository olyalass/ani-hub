import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, Store, applyMiddleware } from 'redux'
import { thunk, ThunkMiddleware } from 'redux-thunk'

import App from './App.tsx'
import './index.css'
import { DispatchType, StateType } from './types'
import { ActionType } from './redux/actions'
import rootReducer, { RootState } from './redux/reducer.ts'

const store: Store<RootState, ActionType> & { dispatch: DispatchType } =
  createStore(
    rootReducer,
    applyMiddleware(thunk as ThunkMiddleware<StateType, ActionType>),
  )

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
