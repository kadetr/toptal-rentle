import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { showApartmentDetails, updateApartment } from '../actions/apartmentActions'
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

  const dispatch = useDispatch()

  const apartmentDetails = useSelector((state) => state.apartmentDetails)
  const { loading, error, apartment } = apartmentDetails

  const apartmentUpdate = useSelector((state) => state.apartmentUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = apartmentUpdate

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

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
