import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { fetchTodos, fetchUser } from '../../store/slice'
import './ShopStyle.css' // Tell webpack that Button.js uses these styles
// ON DRAG
function drag(ev) {
  ev.dataTransfer.effectAllowed = 'copy'
  ev.dataTransfer.setData('text', ev.target.id)
}

function ShopComponent() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchTodos())
    dispatch(fetchUser(0))
  }, [dispatch])

  const AllPlants = useSelector(state => state.MyTestReducer.AllPlants)
  const money = useSelector(state => state.MyTestReducer.money)
  const NotEnoughtMoney = useSelector(
    state => state.MyTestReducer.NotEnoughtMoney,
  )
  const TraderSpech = useSelector(state => state.MyTestReducer.TraderSpech)

  return (
    <div className="shop-wrapper flex">
      <div className="trader-area">
        <div
          className="TalkBox animate-bounce "
          style={{
            opacity: TraderSpech ? '1' : '0',
            color: NotEnoughtMoney ? 'red' : 'rgb(116, 201, 27)',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          {TraderSpech}
        </div>
        <img
          src="/images/ShopImg/trader.png"
          style={{ width: 160, height: 'auto', padding: 10, borderRadius: 7 }}
          draggable="false"
        />
        <div
          style={{
            textAlign: 'center',
            color: '#fff',
            borderRadius: 5,
            fontStyle: 'italic',
            background: '#666666',
          }}
        >
          Joney
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <div
          className="flex"
          style={{
            borderBottom: '1px solid #fff',
            padding: 20,
            textAlign: 'center',
          }}
        >
          <h1
            style={{
              flex: 1,
              color: '#74c91b',
              fontWeight: 'bold',
              letterSpacing: 0.5,
            }}
          >
            {' '}
            THE BEST SHOP{' '}
          </h1>
          <div style={{ paddingRight: 20 }}>
            <img
              src="/images/ShopImg/moneyIcon.png"
              alt=""
              height={25}
              width={35}
              draggable="false"
              style={{ display: 'inline-block' }}
            />
            <span style={{ color: '#e8da89', fontSize: 16 }}> {money} $ </span>
          </div>
        </div>
        <div className="ShopContainer , flex" style={{ flexDirection: 'row' }}>
          {AllPlants.map((testObj, index) => {
            return (
              <div
                key={index}
                title="Drag And Drop"
                style={{
                  background: 'rgba(70, 69, 69, 1)',
                  minWidth: 100,
                  padding: 10,
                  margin: 10,
                  textAlign: 'center',
                  borderRadius: 5,
                  cursor: 'pointer',
                }}
              >
                <div>
                  <img
                    id={index}
                    src={testObj.img}
                    draggable="true"
                    alt=""
                    onDragStart={e => {
                      drag(e)
                    }}
                    data-price={testObj.price}
                    style={{ width: 85, height: 85, margin: '0 auto' }}
                  />
                </div>
                <p className="price" style={{ color: '#fff' }}>
                  {' '}
                  {testObj.price} ${' '}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ShopComponent
