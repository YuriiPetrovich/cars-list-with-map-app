import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import carsAPI from "../../api/carsApi";

export type Car = {
    id: number,
    name: string,
    model: string,
    year: number,
    color: string,
    price: number,
    latitude: number,
    longitude: number
};

export interface Cars{
    cars: Array<Car>;
};

const initialState: Cars = {
    cars: []
};

export const fetchCars = createAsyncThunk(
    'cars/fetchStatus',
    async () => {
        const response = await carsAPI.getCars()
        return response;
    }
)


export const carSlice = createSlice({
    name: 'cars',
    initialState,
    reducers: {
        deleteCar: (state, action: PayloadAction<Number>) => {
            state.cars = state.cars.filter((car) => car.id !== action.payload);
        },
        updateCar: (state, action: PayloadAction<{name: string, price: number, id: number}>) => {
            const cars = state.cars.concat([]);
            cars.forEach((car) => {if(car.id === action.payload.id){
                car.name = action.payload.name;
                car.price = action.payload.price;
            }})
            state.cars = cars;
        },
        sortByYear: (state) => {
            state.cars = state.cars.sort((car1, car2) => car2.year - car1.year);
        },
        sortByPrice: (state) => {
            state.cars = state.cars.sort((car1, car2) => car2.price - car1.price);
        }
    },

    extraReducers: (builder) => {
        builder.addCase(fetchCars.fulfilled, (state, action: PayloadAction<Car[]>) => {
            state.cars = action.payload;
        })
    },
})

export const { deleteCar, updateCar, sortByYear, sortByPrice } = carSlice.actions;

export default carSlice.reducer;