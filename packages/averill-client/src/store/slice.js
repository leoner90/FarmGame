import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

async function PostDbCall(whatToCall, data, rejectWithValue) {
  // Assign Method , Header And DATA
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }

  // Try To Call DB And Get Answer
  try {
    const response = await fetch(
      `http://localhost:3000/${whatToCall}`,
      requestOptions,
    )
    if (!response.ok) {
      throw new Error('Server Error!')
    }
    const data = await response.json()
    return data
  } catch (error) {
    return rejectWithValue(error.message)
  }
}

// Get All Plants From Server
export const fetchTodos = createAsyncThunk(
  'MyTestReducer/fetchTodos',
  async function (data, { rejectWithValue }) {
    return PostDbCall('getPlants', data, rejectWithValue)
  },
)

// Get User Data and his Game Field
export const fetchUser = createAsyncThunk(
  'MyTestReducer/fetchUser',
  async function (data, { rejectWithValue }) {
    const userId = { userId: data }
    return PostDbCall('getUser', userId, rejectWithValue)
  },
)

// Get User Data and his Game Field
export const GenerateUserGameField = createAsyncThunk(
  'MyTestReducer/GenerateUserGameField',
  async function (data, { rejectWithValue }) {
    const userId = { userId: data }
    return PostDbCall('GenerateUserGameField', userId, rejectWithValue)
  },
)

// Try To buy new Item
export const buyItem = createAsyncThunk(
  'MyTestReducer/buyItem',
  async function (data, { rejectWithValue }) {
    return PostDbCall('buyItem', data, rejectWithValue)
  },
)

const setError = (state, action) => {
  state.status = 'rejected'
  state.error = action.payload
}

export const counterSlice = createSlice({
  name: 'MyTestReducer',
  initialState: {
    AllPlants: [],
    status: null,
    error: null,
    user: '',
    money: null,
    NotEnoughtMoney: null,
    TraderSpech: false,
    GameField: [],
  },
  reducers: {},
  extraReducers: {
    [fetchTodos.pending]: state => {
      state.status = 'loading'
      state.error = null
    },
    [fetchTodos.fulfilled]: (state, action) => {
      state.status = 'resolved'
      state.AllPlants = action.payload
    },
    [fetchTodos.rejected]: setError,

    [fetchUser.fulfilled]: (state, action) => {
      state.status = 'resolved'
      state.money = action.payload.money
    },
    [buyItem.fulfilled]: (state, action) => {
      state.status = 'resolved'
      state.NotEnoughtMoney = false
      if (action.payload.money) {
        if (action.payload.money === true) {
          action.payload.money = 0
        }
        state.money = action.payload.money
        state.TraderSpech = 'GOOD DEAL'
      } else {
        state.TraderSpech = 'NO MONEY- NO DEAL'
        state.NotEnoughtMoney = true
      }
    },

    [GenerateUserGameField.fulfilled]: (state, action) => {
      state.status = 'resolved'
      state.GameField = action.payload
    },
  },
})

export default counterSlice.reducer
