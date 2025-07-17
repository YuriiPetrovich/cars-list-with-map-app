import './styles.css'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import { Car } from '../../store/slices/cars';

interface Props {
  cars: Car[];
}

const Map: React.FC<Props> = (props) => {
    let icon = L.icon({
        iconUrl: markerIconPng,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
    })
    return (
            <MapContainer className='Map' center={[55.753332, 37.621676]} zoom={5} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {props.cars.map((car) => (
                    <Marker position={[car.latitude, car.longitude]} icon={icon} key={car.id}>
                        <Popup>
                            {car.name + " " + car.model} <br /> {"Цена: " + car.price}
                        </Popup>
                    </Marker>
                ))}
                {/* <Marker position={[55.753332, 37.621676]} icon={icon}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
                </Marker> */}
            </MapContainer>
    )
}

export default Map;
