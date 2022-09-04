import {createSlice} from "@reduxjs/toolkit"

export const clipList = createSlice({
    name : 'clipId',
    initialState : [],
    reducers : {
      addId(state, action){
        state.push(action.payload)
        console.log(state);
      }
    }
})

export const {addID} = 
export default clipList.reducer;
