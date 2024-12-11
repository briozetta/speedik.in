import { createSlice } from '@reduxjs/toolkit';

const initialState ={
    searchTerm : "",
    carFilter:"recentlyAdded",
    vehicleSecondFilter:"",
    vehicleFilter:"recentlyAdded",
    locationFilter:"Default"
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
        },
        setLocationFilter :(state,action)=>{
            state.locationFilter = action.payload;
        },
        setVehicleSecondFilter :(state,action)=>{
            state.vehicleSecondFilter = action.payload;
        }
    }
})

export const {setSearchTerm,setCarFilter,setVehicleFilter,setVehicleSecondFilter
    ,setLocationFilter
} = filterSlice.actions;
export default filterSlice.reducer;