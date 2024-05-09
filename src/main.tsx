import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, Store, applyMiddleware } from 'redux'
import { thunk, ThunkMiddleware } from 'redux-thunk'

import App from './App.tsx'
import './index.css'
import { ActionType, DispatchType, StateType } from './types'
import reducer from './redux/reducer.ts'

const store: Store<StateType, ActionType> & { dispatch: DispatchType } =
  createStore(
    reducer,
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
