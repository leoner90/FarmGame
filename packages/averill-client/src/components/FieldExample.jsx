import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { buyItem, GenerateUserGameField } from '../store/slice'
import './FieldStyle.css'

function FieldTest() {
  // Variables
  const dispatch = useDispatch()
  const Money = useSelector(state => state.MyTestReducer.money)
  const GameField = useSelector(state => state.MyTestReducer.GameField)

  // Get Game field on Load (Return Generated field based on array and user data receved from server)
  useEffect(() => {
    dispatch(GenerateUserGameField(0))
  }, [dispatch])

  // On Drop Function
  // Gets info from droped items -> PlantId , PlantPrice , index of cell where img was dropped
  // Checks is there enought Money to buy Plant on Front end
  // Generates Object sends to the server (TO DO , mast called after frontEnd money check!!)
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
    <div className="flex-1">
      <div className="Game-field-wrapper">
        {/* Game Field Array , go trhtought Array if some cell have field sets img */}
        {/* haveField -> contains img src based on plant id (logic on server side) --> TODO in future , return only plant id */}
        {GameField.map((haveField, index) => {
          return (
            <div
              className="Game-field-cell"
              key={index}
              onDrop={e => {
                drop(e, index)
              }}
              onDragOver={e => {
                e.preventDefault()
              }}
            >
              {haveField ? (
                <img
                  className="Game-field-cell-img "
                  src={haveField}
                  alt=""
                  draggable="false"
                />
              ) : null}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default FieldTest
