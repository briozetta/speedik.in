import { createSlice } from '@reduxjs/toolkit';

const initialState ={
    searchTerm : "",
    userFilter:"recentlyAdded",
}

const filterSlice = createSlice({
    name:"userFilter",
    initialState,
    reducers:{
        setSearchTerm :(state,action)=>{
            state.searchTerm=action.payload
        },
        setUserFilter :(state,action)=>{
            state.userFilter = action.payload
        }
    }
})

export const {setSearchTerm,setUserFilter} = filterSlice.actions;
export default filterSlice.reducer;