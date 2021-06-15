import React, {useEffect, useRef,useState} from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import ApartmentMapInfo from "./ApartmentMapInfo"
import dotenv from "dotenv"
dotenv.config()

const containerStyle = {
    width: '450px',
    height: '450px'
  };
  function ListApartmentMap({apartments, selectedId, clickable, setGeolocationOnMap}) {
  
  const mapRef = useRef(null);
  const [map, setMap] = React.useState(null)
  const [marker, setMarker] = React.useState({lat:0, lng:0})
  const [position, setPosition] = useState({
      lat: 38.3231215, 
      lng: 27.1382404
  });

  function handleLoad(map) {
    mapRef.current = map;
  }

  function handleCenter() {
    if (!mapRef.current) return;

    const newPos = mapRef.current.getCenter().toJSON();
    setPosition(newPos);
  }


  const { isLoaded } = useJsApiLoader({
    id: 'google-map-rentle',
    googleMapsApiKey: "AIzaSyBz-DGgWxh1FSE-OKh9yGmOBKSbNUg7stY"
  })

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      zoom={9}
      onLoad={handleLoad}
    onDragEnd={handleCenter}
    center={position}
      onUnmount={onUnmount}
      onClick={e =>{
        if(clickable){
        const lat =e.latLng.lat()
        const lng =e.latLng.lng()
        setMarker({lat,lng})
        setGeolocationOnMap({lat, lng})}
      }}
    >
      { /* Child components, such as markers, info windows, etc. */ }
      <>
      {apartments&& apartments.map((apartment) => (
                        <ApartmentMapInfo apartment={apartment} key={apartment._id} selectedId={selectedId} />
                        ))}
      {clickable? <Marker position={marker}  />:<></>}
      </>
    </GoogleMap>
) : <></>
}
export default ListApartmentMap;