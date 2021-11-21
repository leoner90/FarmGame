const express = require('express')
// const { json } = require("express");
// init express router
const router = express.Router()

// HARD CODED DATA FOR DB
const user = [
  {
    id: 0,
    name: 'leoner',
    money: 30000,
    GameField: [
      { index: 0, PlantId: 1 },
      { index: 5, PlantId: 0 },
    ],
  },
]

const Plants = [
  {
    id: 0,
    img: '/images/ShopImg/PlantsImages/tomato.png',
    price: 10002,
  },

  {
    id: 1,
    img: '/images/ShopImg/PlantsImages/potato.png',
    price: 9999,
  },
]

// GAME FIELD GENERATOR
function GameFieldGenerator() {
  const Gamefield = [...Array(64)]
  const UserField = user[0].GameField
  UserField.forEach(element => {
    Gamefield[element.index] = Plants[element.PlantId].img
  })
  return Gamefield
}

router.post('/GenerateUserGameField', (req, res) => {
  const UserGameField = GameFieldGenerator()
  res.json(UserGameField)
})

router.post('/getPlants', (req, res) => {
  res.json(Plants)
})

router.post('/getUser', (req, res) => {
  const userId = req.body.userId
  res.json(user[userId])
})

router.post('/buyItem', (req, res) => {
  // Model
  const data = req.body[0]
  const userId = data.userId
  const PlantId = data.PlantId
  const fieldIndex = data.index
  const userMoney = user[userId].money
  const PlantPrice = Plants[PlantId].price
  if (userMoney < PlantPrice) {
    res.json({ money: false })
  } else {
    user[userId].money = userMoney - PlantPrice
    const userGameField = user[userId].GameField
    userGameField.push({ index: fieldIndex, PlantId: PlantId })

    user[userId].money === 0
      ? res.json({ money: true })
      : res.json({ money: user[userId].money })
  }
})

module.exports = router
