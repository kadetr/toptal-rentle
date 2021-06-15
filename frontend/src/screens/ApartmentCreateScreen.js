import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { createApartment } from "../actions/apartmentActions";
import ListApartmentMap from "../components/ListApartmentMap"
import Geocode from "react-geocode";


Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS);
Geocode.setLanguage("en");
Geocode.setRegion("tr");

Geocode.setLocationType("ROOFTOP");

Geocode.enableDebug();


const ApartmentCreateScreen = ({  history }) => {
   const [name, setName] = useState('')
   const [description, setDescription] = useState('')
   const [price, setPrice] = useState("")
   const [size, setSize] = useState("")
   const [rooms, setRooms] = useState("")
   const [isRented, setIsRented] = useState(false)
   const [geolocation, setGeolocation] = useState({lat:38.3231215, lng:27.1382404})
   const [addressFlag,setAddressFlag] = useState(false)
   const [address,setAddress] = useState("")

   const dispatch = useDispatch();

   const userLogin = useSelector((state) => state.userLogin)
   const { loading, error, userInfo } = userLogin

   const rName= userInfo.name

   const submitHandler = (event, name, description, price, size, rooms, geolocation, rName) => {
      event.preventDefault();
      if(addressFlag)
        Geocode.fromAddress(address).then(
          (response) => {
            const { lat, lng } = response.results[0].geometry.location;
          },
          (error) => {
            console.error(error);
          }
        );
      dispatch(createApartment(name, description, price, size, rooms,geolocation, rName));
      history.push("/realtor/apartmentlist")
   };

   const handleAddressFlag = (flag) =>{
    setAddressFlag(flag)
   }

   const setGeolocationOnMap = (marker) =>{
      setGeolocation(marker)
   }

   return (
   <FormContainer>
   <h1>New Apartment</h1>
   
   {error && <Message variant='danger'>{error}</Message>}
   {loading && <Loader />}
   <Form onSubmit={submitHandler}>
     <Row>
       <Col className="w-50">
        <Form.Group controlId='name'>
        <Form.Label>Name</Form.Label>
        <Form.Control
          type='text'
          placeholder='Enter apartment name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></Form.Control>
      </Form.Group>
       </Col>
       <Col className="w-50">
       <Form.Group controlId='price'>
       <Form.Label>Price</Form.Label>
       <Form.Control
         type='number'
         placeholder='Enter price'
         value={price}
         onChange={(e) => setPrice(e.target.value)}
       ></Form.Control>
     </Form.Group>
       </Col>
       </Row>  
    <div className="my-2">{addressFlag ? 
      <span onClick={()=>handleAddressFlag(false)} style={{cursor: "pointer"}} >Geolocation</span>
    : <span onClick={()=>handleAddressFlag(false)} style={{cursor: "pointer", fontWeight: "bold"}} >Geolocation</span> } | 
    {addressFlag ? 
      <span onClick={()=>handleAddressFlag(true)} style={{cursor: "pointer", fontWeight: "bold"}}>Address</span>
    : <span onClick={()=>handleAddressFlag(true)} style={{cursor: "pointer"}}>Address</span>} </div>
    {!addressFlag ? 
    <Form.Group controlId='geolocation'>
      <ListApartmentMap clickable ={true} setGeolocationOnMap={setGeolocationOnMap}/>
      <Row>
      <Col className="w-50 py-3">
        <Form.Label>Latitude</Form.Label>
      <Form.Control
        type='number'
        placeholder='Latitude'
        value={geolocation.lat}
        onChange={(e) => {
         const val = e.target.value;
         setGeolocation(prevState => {
           return { ...prevState, lat: val }
         });
        }}
      ></Form.Control>

      </Col>
      <Col className="w-50 py-3">
        <Form.Label>Longitude</Form.Label>
      <Form.Control
        type='number'
        placeholder='Longitude'
        value={geolocation.lng}
        onChange={(e) => {
         const val = e.target.value;
         setGeolocation(prevState => {
           return { ...prevState, lng: val }
         });
        }}
      ></Form.Control>
       </Col>
      </Row>
    </Form.Group>: <Row>
       <Col>
       <Form.Group controlId='address'>
       <Form.Control
         type='text'
         as="textarea"
         rows={2}
         placeholder='Enter address'
         value={address}
         onChange={(e) => setAddress(e.target.value)}
       ></Form.Control>
     </Form.Group>
       </Col>
       </Row>
  }
     <Row>
       <Col>
<Form.Group controlId='description'>
       <Form.Label>Description</Form.Label>
       <Form.Control
         type='text'
         as="textarea"
         rows={3}
         placeholder='Enter description'
         value={description}
         onChange={(e) => setDescription(e.target.value)}
       ></Form.Control>
     </Form.Group>
       </Col>
       </Row>

       <Row>
       <Col className="w-50">
       <Form.Group controlId='size'>
       <Form.Label>Size -in square meters-</Form.Label>
       <Form.Control
         type='number'
         placeholder='Size'
         value={size}
         onChange={(e) => setSize(e.target.value)}
       ></Form.Control>
     </Form.Group>

        </Col>

        <Col className="w-50">
        <Form.Group controlId='rooms'>
       <Form.Label>Number of Rooms</Form.Label>
       <Form.Control
         type='number'
         placeholder='Rooms'
         value={rooms}
         onChange={(e) => setRooms(e.target.value)}
       ></Form.Control>
     </Form.Group>

        </Col>
         </Row>
     <Form.Group controlId='isRented'>
              <Form.Check
                type='checkbox'
                label='Is Rented'
                checked={isRented}
                onChange={(e) => setIsRented(e.target.checked)}
              ></Form.Check>
            </Form.Group>

     <Button type='submit' variant='primary' onClick={(e)=>submitHandler(e, name, description, price, size, rooms, geolocation, rName)}>
       publish
     </Button>
   </Form>
 </FormContainer>
)
};

export default ApartmentCreateScreen;
