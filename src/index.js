import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'

import App from './App'
import authReducer from './store/reducers/auth'
import orderReducer from './store/reducers/order'
import burgerBuilderReducer from './store/reducers/burgerBuilder'
import { watchAuth, watchBurgerBuilder, watchOrder } from './store/sagas/index'
import './styles/App.scss'


// Combine reducers and setup redux devtool
const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose
const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer, 
  order: orderReducer,
  auth: authReducer
})

// Initialize Saga Middleware
const sagaMiddleware = createSagaMiddleware()

// Create store
const store = createStore(
  rootReducer, 
  composeEnhancers(applyMiddleware(thunk, sagaMiddleware))
)

// Run Saga's middleware
sagaMiddleware.run(watchAuth, watchBurgerBuilder)
sagaMiddleware.run(watchBurgerBuilder)
sagaMiddleware.run(watchOrder)

const app = (
  <Provider store={store} >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

const root = document.getElementById('root')
render(app, root)


