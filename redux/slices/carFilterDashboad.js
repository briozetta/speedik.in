import { createSlice } from '@reduxjs/toolkit';

const initialState ={
    searchTerm : "",
    carFilter:"recentlyAdded",
}

const filterSlice = createSlice({
    name:"carFilterDashboad",
    initialState,
    reducers:{
        setSearchTerm :(state,action)=>{
            state.searchTerm=action.payload
        },
        setCarFilter :(state,action)=>{
            state.carFilter = action.payload
        }
    }
})

export const {setSearchTerm,setCarFilter} = filterSlice.actions;
export default filterSlice.reducer;