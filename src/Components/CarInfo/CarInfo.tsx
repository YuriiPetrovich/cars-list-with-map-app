import './styles.css'
import React, { useState } from 'react';
import { Car, deleteCar, sortByPrice, sortByYear, updateCar } from '../../store/slices/cars';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import {ReactComponent as DeleteSvg} from '../../icons/delete-svgrepo-com.svg'
import {ReactComponent as EditSvg} from '../../icons/edit-svgrepo-com.svg'
import {ReactComponent as SaveSvg} from '../../icons/save-svgrepo-com.svg'

interface Props {
  cars: Car[];
}

const CarInfo: React.FC<Props> = (props) => {
  const dispatch = useDispatch<AppDispatch>()
  const initialState: Number[] = [];
  const [changingCars, setChangingCars] = useState(initialState);
  const [yearSortToggled, setYearSortToggled] = useState(false);
  const [priceSortToggled, setPriceSortToggled] = useState(false);
  return (
    <div className='CarInfo'>
      <table>
        <thead>
          <tr>
            <th><p>Наименовение</p></th>
            <th><p>Модель</p></th>
            <th><button onClick={()=>{ 
              setYearSortToggled(true);
              setPriceSortToggled(false);
              dispatch(sortByYear())}}>
                <p>Год выпуска {yearSortToggled ? "▼" : ""}</p>
            </button></th>
            <th><button onClick={()=>{ 
              setYearSortToggled(false); 
              setPriceSortToggled(true); 
              dispatch(sortByPrice())}}>
                <p>Цена {priceSortToggled ? "▼" : ""}
            </p></button></th>
          </tr>
        </thead>
        <tbody>
        {props.cars.map((car) => (
          <tr key={car.id}>
            <td>{changingCars.includes(car.id) ? 
            <input id={`CarName${car.id}`} defaultValue={car.name}/>
            :
            <p>{car.name}</p>}</td>
            <td><p>{car.model}</p></td>
            <td><p>{String(car.year)}</p></td>
            <td>{changingCars.includes(car.id) ? 
            <input id={`CarPrice${car.id}`} defaultValue={car.price}/>
            :
            <p>{String(car.price)}</p>}</td>
            <td className='tdButton'>{changingCars.includes(car.id) ? 
            <button className='ActionButton' onClick={()=>{
              const nameInput = document.getElementById(`CarName${car.id}`) as HTMLFormElement;
              const priceInput = document.getElementById(`CarPrice${car.id}`) as HTMLFormElement;
              dispatch(updateCar({name: nameInput.value, price: priceInput.value, id: car.id}));
              setChangingCars(changingCars.filter((id)=>id!==car.id))}}>
                <SaveSvg className='editIcon' />
            </button>
            :
            <button onClick={()=>{setChangingCars(changingCars.concat(car.id))}}>
              <EditSvg className='editIcon'/>
            </button>}</td>
            <td className='tdButton'><button onClick={()=>dispatch(deleteCar(car.id))}>
              <DeleteSvg  className='deleteIcon'/>
            </button></td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}


export default CarInfo;