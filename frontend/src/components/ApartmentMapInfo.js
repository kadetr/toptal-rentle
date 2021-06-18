import React, {useState} from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';
import { PropTypes } from 'prop-types'


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

    return (<div data-testid="apartmentMapInfoComponent">
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
                     <div>
                     <p data-testid="componentName" style={{padding:0, margin:"4px"}}><span style={{fontWeight: "bold"}}>Name</span> {apartment.name}</p>
                     <p data-testid="componentDescription" style={{padding:0, margin:"4px"}}><span style={{fontWeight: "bold"}}>Description</span> {apartment.description}</p>
                     <p data-testid="componentPrice" style={{padding:0, margin:"4px"}}><span style={{fontWeight: "bold"}}>Price</span> {apartment.price}</p>
                     <p data-testid="componentSize" style={{padding:0, margin:"4px"}}><span style={{fontWeight: "bold"}}>Floor Area</span> {apartment.size}</p>
                     <p data-testid="componentRooms" style={{padding:0, margin:"4px"}}><span style={{fontWeight: "bold"}}>Number of Rooms</span> {apartment.rooms}</p>
                     <p data-testid="componentRealtorName" style={{padding:0, margin:"4px"}}><span style={{fontWeight: "bold"}}>Realtor</span> {apartment.rName}</p>
                    </div>
                 </InfoWindow>)
                }
                {
                    (apartment._id===selectedId) &&
                 <InfoWindow onCloseClick={handleToggleClose
                     } >
                     <div>
                      <p data-testid="componentName" style={{padding:0, margin:"4px"}}><span style={{fontWeight: "bold"}}>Name</span> {apartment.name}</p>
                     <p data-testid="componentDescription" style={{padding:0, margin:"4px"}}><span style={{fontWeight: "bold"}}>Description</span> {apartment.description}</p>
                     <p data-testid="componentPrice" style={{padding:0, margin:"4px"}}><span style={{fontWeight: "bold"}}>Price</span> {apartment.price}</p>
                     <p data-testid="componentSize" style={{padding:0, margin:"4px"}}><span style={{fontWeight: "bold"}}>Floor Area</span> {apartment.size}</p>
                     <p data-testid="componentRooms" style={{padding:0, margin:"4px"}}><span style={{fontWeight: "bold"}}>Number of Rooms</span> {apartment.rooms}</p>
                     <p data-testid="componentRealtorName" style={{padding:0, margin:"4px"}}><span style={{fontWeight: "bold"}}>Realtor</span> {apartment.rName}</p>
                    </div>
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
                 <div>
                     <p data-testid="componentName" style={{padding:0, margin:"4px"}}><span style={{fontWeight: "bold"}}>Name</span> {apartment.name}</p>
                     <p data-testid="componentDescription" style={{padding:0, margin:"4px"}}><span style={{fontWeight: "bold"}}>Description</span> {apartment.description}</p>
                     <p data-testid="componentPrice" style={{padding:0, margin:"4px"}}><span style={{fontWeight: "bold"}}>Price</span> {apartment.price}</p>
                     <p data-testid="componentSize" style={{padding:0, margin:"4px"}}><span style={{fontWeight: "bold"}}>Floor Area</span> {apartment.size}</p>
                     <p data-testid="componentRooms" style={{padding:0, margin:"4px"}}><span style={{fontWeight: "bold"}}>Number of Rooms</span> {apartment.rooms}</p>
                     <p data-testid="componentRealtorName" style={{padding:0, margin:"4px"}}><span style={{fontWeight: "bold"}}>Realtor</span> {apartment.rName}</p>
                </div>
             </InfoWindow>
            }
            {
                (apartment._id===selectedId) &&
             <InfoWindow onCloseClick={handleToggleClose
                 } >
                 <div>
                   <p data-testid="componentName" style={{padding:0, margin:"4px"}}><span style={{fontWeight: "bold"}}>Name</span> {apartment.name}</p>
                     <p data-testid="componentDescription" style={{padding:0, margin:"4px"}}><span style={{fontWeight: "bold"}}>Description</span> {apartment.description}</p>
                     <p data-testid="componentPrice" style={{padding:0, margin:"4px"}}><span style={{fontWeight: "bold"}}>Price</span> {apartment.price}</p>
                     <p data-testid="componentSize" style={{padding:0, margin:"4px"}}><span style={{fontWeight: "bold"}}>Floor Area</span> {apartment.size}</p>
                     <p data-testid="componentRooms" style={{padding:0, margin:"4px"}}><span style={{fontWeight: "bold"}}>Number of Rooms</span> {apartment.rooms}</p>
                     <p data-testid="componentRealtorName" style={{padding:0, margin:"4px"}}><span style={{fontWeight: "bold"}}>Realtor</span> {apartment.rName}</p>
                </div>
             </InfoWindow>
            }
            </Marker>)}
            
            </div>
        )
}

ApartmentMapInfo.propTypes = {
    apartment: PropTypes.object,
    selectedId: PropTypes.string
  }

export default ApartmentMapInfo;