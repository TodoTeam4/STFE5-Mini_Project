import { configureStore, createSlice } from '@reduxjs/toolkit'


//useState랑 비슷한 역할
let clipList = createSlice({
  name : 'clipId',
  initialState : [],
  reducers : {
    addId(state, action){
      state.push(action.payload)
      console.log(state)

    },
    removeId(state, action){
      let remove = state.filter((item) => item.id !== action.payload)
      return remove
    }
  }
})

// let searchValue = createSlice({
// name : 'search',
// initialState : [],
// reducers : {
//   searchInput(state, action){
//     state = action.payload
//     console.log(state)
//   }
// }
// })


export let {addId, removeId} = clipList.actions
// export let {searchInput} = searchValue.actions


export default configureStore({
reducer: { 
  clipList : clipList.reducer,
  // searchValue : searchValue.reducer
}
})