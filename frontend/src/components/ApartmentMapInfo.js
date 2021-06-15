import React, {Component, useEffect, useState} from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';


function ApartmentMapInfo ({apartment, selectedId}) {

    const [isOpen, setIsOpen] = useState(false)


    const handleToggleOpen = () => {
        setIsOpen(true)
    }

    const handleToggleClose = () => {
        setIsOpen(false)
        
    }

    return (
            <Marker
                key={apartment._id}
                position={apartment.geolocation}
                onClick={handleToggleOpen}
            >

            {
                (isOpen) &&
             <InfoWindow onCloseClick={handleToggleClose
                 } >
                 <>
                 <p>{apartment.name}</p>
                 <p>{apartment.description}</p>
                </>
             </InfoWindow>
            }
            {
                (apartment._id===selectedId) &&
             <InfoWindow onCloseClick={handleToggleClose
                 } >
                 <>
                 <p>{apartment.name}</p>
                 <p>{apartment.description}</p>
                </>
             </InfoWindow>
            }
            </Marker>

        )
}

export default ApartmentMapInfo;