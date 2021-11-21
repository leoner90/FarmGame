import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { buyItem, GenerateUserGameField } from '../store/slice'

function FieldTest() {
  const dispatch = useDispatch()
  const Money = useSelector(state => state.MyTestReducer.money)

  useEffect(() => {
    dispatch(GenerateUserGameField(0))
  }, [dispatch])

  const GameField = useSelector(state => state.MyTestReducer.GameField)

  async function drop(ev, index) {
    ev.preventDefault()
    const PlantId = ev.dataTransfer.getData('text')
    const Plant = document.getElementById(PlantId)
    const PlantPrice = Plant.getAttribute('data-price')
    const data = [{ PlantId: PlantId, index: index, userId: 0 }]
    dispatch(buyItem(data))
    if (Money >= PlantPrice) {
      const nodeCopy = document.getElementById(PlantId).cloneNode(true)
      nodeCopy.id = 'newId' /* We cannot use the same ID */
      nodeCopy.draggable = false
      ev.target.appendChild(nodeCopy)
    }
  }
  return (
    <div>
      <div
        className=""
        id="div1"
        style={{
          minHeight: 120,
          border: '1px solid red',
          display: 'flex',
          flexWrap: 'wrap',
          padding: 20,
        }}
      >
        {GameField.map((testObj, index) => {
          return (
            <div
              key={index}
              style={{
                minHeight: '85px',
                border: '1px solid red',
                alignItems: 'center',
                display: 'flex',
                flex: '1 0 12.5%',
              }}
              onDrop={e => {
                drop(e, index)
              }}
              onDragOver={e => {
                e.preventDefault()
              }}
            >
              {testObj ? (
                <img
                  src={testObj}
                  alt=""
                  draggable="false"
                  style={{ width: 85, height: 85, margin: '0 auto' }}
                />
              ) : (
                ''
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default FieldTest
