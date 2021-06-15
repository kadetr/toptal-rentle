import React, {useState} from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';


function ApartmentMapInfo ({apartment, selectedId}) {

    const [isOpen, setIsOpen] = useState(false)


    const handleToggleOpen = () => {
        setIsOpen(true)
    }

    const handleToggleClose = () => {
        setIsOpen(false)
        
    }

    const svgMarkerB = {
        path: "M-20,0a20,20 0 1,0 40,0a20,20 0 1,0 -40,0",
        fillColor: "blue",
        fillOpacity: 0.6,
        strokeWeight: 0,
        rotation: 0,
        scale: 0.7,

      };

      const svgMarkerR = {
        path: "M-20,0a20,20 0 1,0 40,0a20,20 0 1,0 -40,0",
        fillColor: "red",
        fillOpacity: 0.6,
        strokeWeight: 0,
        rotation: 0,
        scale: 0.7,

      };

    return (<>
            {apartment.isRented ?
                (<Marker
                    key={apartment._id}
                    position={apartment.geolocation}
                    onClick={handleToggleOpen}
                    icon= {svgMarkerR}
                >
    
                {
                    (isOpen) &&
                 (<InfoWindow onCloseClick={handleToggleClose
                     } >
                     <>
                     <p>{apartment.name}</p>
                     <p>{apartment.description}</p>
                    </>
                 </InfoWindow>)
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
                </Marker>)
                :(<Marker
                key={apartment._id}
                position={apartment.geolocation}
                onClick={handleToggleOpen}
                icon= {svgMarkerB}
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
            </Marker>)}
            
            </>
        )
}

export default ApartmentMapInfo;