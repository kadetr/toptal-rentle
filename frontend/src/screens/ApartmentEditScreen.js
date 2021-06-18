import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row,Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { showApartmentDetails, updateApartment } from '../actions/apartmentActions'
import ListApartmentMap from "../components/ListApartmentMap"
import { APARTMENT_UPDATE_RESET } from '../constants/apartmentConstants'

const ApartmentEditScreen = ({ match, history }) => {
  const apartmentId = match.params.id

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState("")
  const [size, setSize] = useState("")
  const [rooms, setRooms] = useState("")
  const [isRented, setIsRented] = useState(false)
  const [geolocation, setGeolocation] = useState({lat:"", lng:""})
  const [rName, setRName] = useState("")
  const [addressFlag,setAddressFlag] = useState(false)
  const [address,setAddress] = useState("")

  const dispatch = useDispatch()

  const apartmentDetails = useSelector((state) => state.apartmentDetails)
  const { loading, error, apartment } = apartmentDetails

  const apartmentUpdate = useSelector((state) => state.apartmentUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = apartmentUpdate

  const handleAddressFlag = (flag) =>{
    setAddressFlag(flag)
   }

   const setGeolocationOnMap = (marker) =>{
    setGeolocation(marker)
 }
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: APARTMENT_UPDATE_RESET })
      history.push('/realtor/apartmentlist')
    } else {
      if (!apartment.name || apartment._id !== apartmentId) {
        dispatch(showApartmentDetails(apartmentId))
      } else {
        setName(apartment.name)
        setDescription(apartment.description)
        setPrice(apartment.price)
        setSize(apartment.size)
        setRooms(apartment.rooms)
        setGeolocation(apartment.geolocation)
        setRName(apartment.rName)
        setIsRented(apartment.isRented)
      }
    }
  }, [dispatch, history, apartmentId, apartment, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateApartment({
        _id: apartmentId,
        name,
        description,
        price,
        size,
        rooms,
        geolocation,
        rName,
        isRented
      })
    )
  }

  return (
    <>
      <Link to='/realtor/apartmentlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Apartment</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
     
            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <div><span onClick={()=>handleAddressFlag(false)}>Geolocation</span> | <span onClick={()=>handleAddressFlag(true)}>Address</span></div>
    {!addressFlag ? 
    <Form.Group controlId='geolocation'>
      <ListApartmentMap clickable ={true} apartment={apartment} setGeolocationOnMap={setGeolocationOnMap} />
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
   <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='size'>
              <Form.Label>Size (m2)</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter size'
                value={size}
                onChange={(e) => setSize(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='rooms'>
              <Form.Label>Number of Rooms</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter number of rooms'
                value={rooms}
                onChange={(e) => setRooms(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='isRented'>
              <Form.Check
                type='checkbox'
                label='Is Rented'
                checked={isRented}
                onChange={(e) => setIsRented(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default ApartmentEditScreen
