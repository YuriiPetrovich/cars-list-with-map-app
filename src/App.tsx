import React, { useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCars } from './store/slices/cars';
import { AppDispatch, RootState } from './store/store';
import CarInfo from './Components/CarInfo/CarInfo';
import Map from './Components/Map/Map';




function App() {

  const dispatch = useDispatch<AppDispatch>();

  useEffect(()=>{
    dispatch(fetchCars());
  },[dispatch])

  const cars = useSelector((state: RootState) => state.cars.cars);

  return (
    <div className="App">
      <header className="App-header">
          Список авто
      </header>
      <main>
        <CarInfo cars={cars} />
        <Map cars={cars}/>
      </main>
    </div>
  );
}

export default App;
