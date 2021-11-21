// Variables
const express = require('express')
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

  {
    id: 2,
    img: '/images/ShopImg/PlantsImages/cucumber.png',
    price: 500,
  },

  {
    id: 3,
    img: '/images/ShopImg/PlantsImages/carrot.png',
    price: 2500,
  },
]

// GAME FIELD GENERATOR
// TODO - Goes to Model
function GameFieldGenerator() {
  const Gamefield = [...Array(64)]
  // predefined User For now
  const UserField = user[0].GameField
  // if user have GameField items buyed
  UserField.forEach(element => {
    Gamefield[element.index] = Plants[element.PlantId].img
  })
  return Gamefield
}

router.post('/GenerateUserGameField', (req, res) => {
  const UserGameField = GameFieldGenerator()
  res.json(UserGameField)
})

// GET All Plants
router.post('/getPlants', (req, res) => {
  res.json(Plants)
})

// Get User Info
router.post('/getUser', (req, res) => {
  const userId = req.body.userId
  res.json(user[userId])
})

// Attemt to but Plants
router.post('/buyItem', (req, res) => {
  // TODO - Goes to Model
  // Variables
  const data = req.body[0]
  const userId = data.userId
  const PlantId = data.PlantId
  const fieldIndex = data.index
  const userMoney = user[userId].money
  const PlantPrice = Plants[PlantId].price

  // If Not enought Money Send back False
  if (userMoney < PlantPrice) {
    res.json({ money: false })
  } else {
    // Check is Field Allredy in Use
    const userGameField = user[userId].GameField
    let allreadyInUse = false
    userGameField.forEach(element => {
      if (element.index === fieldIndex) {
        allreadyInUse = true
      }
    })

    // If allreadyInUse === true -> send back 'InUse' / otherwise get money from user , update user gamefield , and send back rest of the money
    if (allreadyInUse) {
      res.json('InUse')
    } else {
      user[userId].money = userMoney - PlantPrice
      userGameField.push({ index: fieldIndex, PlantId: PlantId })
      res.json({ money: user[userId].money })
    }
  }
})

module.exports = router
