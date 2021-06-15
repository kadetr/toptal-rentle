import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import {
  listApartments,
  deleteApartment,
} from '../actions/apartmentActions'
import { APARTMENT_CREATE_RESET } from '../constants/apartmentConstants'

const ApartmentListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const apartmentList = useSelector((state) => state.apartmentList)
  const { loading, error, apartments, page, pages } = apartmentList

  const apartmentDelete = useSelector((state) => state.apartmentDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = apartmentDelete

  const apartmentCreate = useSelector((state) => state.apartmentCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    apartment: createdApartment,
  } = apartmentCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {

    if (!userInfo || !userInfo.isAdmin ) {
      history.push('/login')
    }

    if (successCreate) {
      history.push(`/realtor/apartments/${createdApartment._id}/edit`)
    } else {
    dispatch(listApartments(pageNumber, true))
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    apartmentCreate,
    pageNumber,
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteApartment(id))
    }
  }

  // const createApartmentHandler = () => {
  //   dispatch(createApartment())
  // }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Apartments</h1>
        </Col>
        {/* <Col className='text-right'>
          <Button className='my-3' onClick={createApartmentHandler}>
            <i className='fas fa-plus'></i> Create Apartment
          </Button>
        </Col> */}
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {/* {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>} */}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>NAME</th>
                <th>PRICE</th>
                <th>SIZE</th>
                <th>ROOMS</th>
                <th>AVAILABLE</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {apartments.map((apartment) => (
                <tr key={apartment._id}>
                  <td>{apartment.name}</td>
                  <td>${apartment.price}</td>
                  <td>{apartment.size}</td>
                  <td>{apartment.rooms}</td>
                  <td>{apartment.isRented +""}</td>
                  <td>
                    <LinkContainer to={`/realtor/apartments/${apartment._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(apartment._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  )
}

export default ApartmentListScreen
