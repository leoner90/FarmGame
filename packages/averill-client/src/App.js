import React from 'react'
import { Provider } from 'react-redux'
import { store } from './store'
import Field from './components/FieldExample.jsx'
import Shop from './components/ShopComponent/Shop.jsx'

export default function App() {
  return (
    <Provider store={store}>
      <div>
        <Field />
        <Shop />
      </div>
    </Provider>
  )
}
