import { createSlice } from '@reduxjs/toolkit';

const initialState ={
    searchTerm : "",
    carFilter:"recentlyAdded",
    vehicleFilter:"recentlyAdded"
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
        },
        setVehicleFilter :(state,action)=>{
            state.vehicleFilter = action.payload;
        }
    }
})

export const {setSearchTerm,setCarFilter,setVehicleFilter} = filterSlice.actions;
export default filterSlice.reducer;