import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Table, Button, DropdownButton,InputGroup, FormControl } from 'react-bootstrap'
import ListApartmentMap from "../components/ListApartmentMap"
import ListApartmentItem from "../components/ListApartmentItem"
import Meta from "../components/Meta"
import Paginate from "../components/Paginate"
import Message from "../components/Message"
import Loader from "../components/Loader"
import {listApartments} from "../actions/apartmentActions"

const HomeScreen = ({match, history}) => {
   const [selectedId, setSelectedId] = useState("")
   const [minPrice, setMinPrice] = useState("")
   const [maxPrice, setMaxPrice] = useState("")
   const [minSize, setMinSize] = useState("")
   const [maxSize, setMaxSize] = useState("")
   const [minRooms, setMinRooms] = useState("")
   const [maxRooms, setMaxRooms] = useState("")
   const [filteredList, setFilteredList] = useState([])

   const pageNumber = match.params.pageNumber || 1

   const dispatch = useDispatch()

   const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin


   const apartmentList = useSelector((state) => state.apartmentList)
   const { loading, error, apartments, page, pages } = apartmentList

   useEffect(() => {
      if(userInfo){
         if(userInfo.isRealtor || userInfo.isAdmin)
            dispatch(listApartments(pageNumber, true))
         else
            dispatch(listApartments())
      }
      else
         history.push('/login')
      
    }, [dispatch,history, pageNumber, userInfo])

      
   const getSelectedId = (id) =>{
      setSelectedId(id)
   }

   const filterApartments = (x) =>{
      if(x==="Price"){
         if(filteredList.length===0)
            setFilteredList(apartments.filter(apartment => (minPrice===""||apartment.price>=minPrice) && (maxPrice===""||apartment.price<=maxPrice)))
         else
            setFilteredList(filteredList.filter(apartment => (minPrice===""||apartment.price>=minPrice) && (maxPrice===""||apartment.price<=maxPrice)))
      }
      else if(x==="Size"){
         if(filteredList.length===0)
            setFilteredList(apartments.filter(apartment => (minSize===""||apartment.size>=minSize) && (maxSize===""||apartment.size<=maxSize)))
         else
            setFilteredList(filteredList.filter(apartment => (minSize===""||apartment.size>=minSize) && (maxSize===""||apartment.size<=maxSize)))
      }
      else if(x==="Rooms"){
         if(filteredList.length===0)
            setFilteredList(apartments.filter(apartment => (minRooms===""||apartment.rooms>=minRooms) && (maxRooms===""||apartment.rooms<=maxRooms)))
         else
            setFilteredList(filteredList.filter(apartment => (minRooms===""||apartment.rooms>=minRooms) && (maxRooms===""||apartment.rooms<=maxRooms)))
      }
   }

   const resetFilters = () =>{
      setMinPrice("")
      setMaxPrice("")
      setMinSize("")
      setMaxSize("")
      setMinRooms("")
      setMaxRooms("")
      setFilteredList(apartments)
   }
   

   return (
      <>
         <Meta />
         <Row>
            <Col className ="my-4">
               <ListApartmentMap  apartments={apartments} selectedId={selectedId} />
            </Col>
            <Col style={{height: "50vh", overflow:"auto"}} className="my-2">
               {loading ? (
                  <Loader />
                  ) : error ? (
                  <Message variant='danger'>{error}</Message>
                  ) : (
                  <>
                    <Table>
                    <thead>
                        <tr>
                        <th style={{margin: "4px", padding: "4px 4px 16px 4px"}}>latest ads</th>
                        <th style={{margin: "4px", padding: "4px"}}>
                           <DropdownButton title="price" variant="text" >
                           <InputGroup className="m-2 w-75">  
                                    <FormControl
                                       placeholder="min"
                                       aria-label="minimum price"
                                       type="number"
                                       value={minPrice}
                                       onChange={(e) => setMinPrice(e.target.value)}
                                    />
                                 </InputGroup>
                                 <InputGroup className="m-2 w-75">
                                    <FormControl
                                       placeholder="max"
                                       aria-label="maximum price"
                                       type="number"
                                       value={maxPrice}
                                       onChange={(e) => setMaxPrice(e.target.value)}
                                       
                                    />
                                 </InputGroup>
                                 <InputGroup>
                                    
                                       <Button variant="outline-secondary" 
                                               style={{margin:"0 4px", padding:0,height:"30px", width:"70px",}} 
                                               onClick={()=>filterApartments("Price")}>
                                                Apply
                                       </Button>
                                       <Button variant="outline-secondary" style={{margin:"0 4px", padding:0,height:"30px", width:"70px"}}
                                       onClick={() => resetFilters()}>Reset</Button>
                                    
                                 </InputGroup>
                           </DropdownButton>
                        </th>
                        <th style={{margin: "4px", padding: "4px"}}>
                           <DropdownButton title="size" variant="text" >
                              <InputGroup className="m-2 w-75">
                                    <FormControl
                                       placeholder="min"
                                       aria-label="max"
                                       type="number"
                                       value={minSize}
                                       onChange={(e) => setMinSize(e.target.value)}
                                    />
                                 </InputGroup>
                                 <InputGroup className="m-2 w-75">
                                    <FormControl
                                       placeholder="maximum size"
                                       aria-label="maximum size"
                                       type="number"
                                       value={maxSize}
                                       onChange={(e) => setMaxSize(e.target.value)}
                                       
                                    />
                                 </InputGroup>
                                 <InputGroup >
                                 <Button variant="outline-secondary" 
                                               style={{margin:"0 4px", padding:0,height:"30px", width:"70px",}} 
                                               onClick={() => filterApartments("Size")}>
                                                Apply
                                       </Button>
                                       <Button variant="outline-secondary" style={{margin:"0 4px", padding:0,height:"30px", width:"70px"}}
                                       onClick={() => resetFilters()}>Reset</Button>
                                 </InputGroup>
                           </DropdownButton>
                        </th>
                        <th style={{margin: "4px", padding: "4px"}}>
                           <DropdownButton title="rooms" variant="text" >
                                 <InputGroup className="m-2 w-75" >
                                    <FormControl
                                       placeholder="min"
                                       aria-label="minimum rooms"
                                       type="number"
                                       value={minRooms}
                                       onChange={(e) => setMinRooms(e.target.value)}
                                    />
                                 </InputGroup>
                                 <InputGroup className="m-2 w-75">
                                    <FormControl
                                       placeholder="max"
                                       aria-label="maximum rooms"
                                       type="number"
                                       value={maxRooms}
                                       onChange={(e) => setMaxRooms(e.target.value)}                               
                                    />
                                 </InputGroup>
                                 <InputGroup>
                                    
                                 <Button variant="outline-secondary" 
                                               style={{margin:"0 4px", padding:0,height:"30px", width:"70px",}} 
                                               onClick={() => filterApartments("Rooms")}>
                                                Apply
                                       </Button>
                                       <Button variant="outline-secondary" style={{margin:"0 4px", padding:0,height:"30px", width:"70px"}}
                                       onClick={() => resetFilters()}>Reset</Button>
                                    
                                 </InputGroup>
                           </DropdownButton>
                        </th>
                        </tr>
                     </thead>
                     <tbody>
                        {!(filteredList.length>0) ? (apartments&& apartments.map((apartment) => (
                     
                           <ListApartmentItem apartment={apartment} getSelectedId={getSelectedId}  />
                       
                        ))):
                        (filteredList&& filteredList.map((apartment) => (
                        
                              <ListApartmentItem apartment={apartment} getSelectedId={getSelectedId}  />
                           )))
                        }
                        </tbody>
                     </Table> 
                     <Paginate
                        pages={pages}
                        page={page}
                     />
                  </>
               )}
            </Col>
         </Row>
         
      </>)
};

export default HomeScreen;
