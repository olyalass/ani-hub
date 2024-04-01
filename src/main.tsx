import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, Store } from 'redux'
import { ActionType, DispatchType, StateType } from './types'
import reducer from './redux/reducer.ts'

const store: Store<StateType, ActionType> & { dispatch: DispatchType } =
  createStore(reducer)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
