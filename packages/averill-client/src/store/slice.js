import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// DB CALL
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
      `http://localhost:4545/${whatToCall}`,
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
export const fetchPlants = createAsyncThunk(
  'MyTestReducer/fetchPlants',
  async function (data, { rejectWithValue }) {
    return PostDbCall('getPlants', data, rejectWithValue)
  },
)

// Get User Data
export const fetchUser = createAsyncThunk(
  'MyTestReducer/fetchUser',
  async function (data, { rejectWithValue }) {
    const userId = { userId: data }
    return PostDbCall('getUser', userId, rejectWithValue)
  },
)

// Get User Game Field
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

// On Error
const setError = (state, action) => {
  state.status = 'rejected'
  state.error = action.payload
}

// Reducer
export const counterSlice = createSlice({
  name: 'MyTestReducer',
  initialState: {
    AllPlants: [],
    status: null,
    error: null,
    user: '',
    money: null,
    NotEnoughtMoney: null,
    TraderSpeech: false,
    GameField: [],
  },

  extraReducers: {
    // Get All Plants
    [fetchPlants.pending]: state => {
      state.status = 'loading'
      state.error = null
    },
    [fetchPlants.fulfilled]: (state, action) => {
      state.status = 'resolved'
      state.AllPlants = action.payload
    },
    [fetchPlants.rejected]: setError,

    // Get / Set User Information
    [fetchUser.fulfilled]: (state, action) => {
      state.status = 'resolved'
      state.money = action.payload.money
    },

    // On Buying Plant
    [buyItem.fulfilled]: (state, action) => {
      state.status = 'resolved'
      // TODO  - To show user that msg disappeared and showed again
      state.NotEnoughtMoney = false

      // Depending on server response
      if (action.payload === 'InUse') {
        state.TraderSpeech = 'THIS FIELD IN USE'
      } else if (action.payload.money !== false) {
        state.money = action.payload.money
        state.TraderSpeech = 'GOOD DEAL'
      } else {
        state.TraderSpeech = 'NO MONEY- NO DEAL'
        state.NotEnoughtMoney = true
      }
    },

    // Set Game Field
    [GenerateUserGameField.fulfilled]: (state, action) => {
      state.status = 'resolved'
      state.GameField = action.payload
    },
  },
})

export default counterSlice.reducer
