import React from 'react'
import { PropTypes } from 'prop-types'

const ListApartmentItem = ({ apartment, getSelectedId }) => {
  return (<tr key={apartment._id} data-testid="listApartmentItemComponent">
    <td className=" py-2 px-0" >
      <span onClick={()=>{getSelectedId(apartment._id)}} data-testid="componentName" style={{"cursor": "pointer"}}>{apartment.name}</span></td>
    <td className=" py-2 px-0" >
    <span onClick={()=>{getSelectedId(apartment._id)}} data-testid="componentPrice" style={{"cursor": "pointer", display: "flex", justifyContent: "center"}}>{apartment.price}</span></td>
    <td className=" py-2 px-0">
    <span onClick={()=>{getSelectedId(apartment._id)}} data-testid="componentSize"style={{"cursor": "pointer", display: "flex", justifyContent: "center"}}>{apartment.size}</span></td>
    <td className=" py-2 px-0">
    <span onClick={()=>{getSelectedId(apartment._id)}} data-testid="componentRooms" style={{"cursor": "pointer", display: "flex", justifyContent: "center"}}>{apartment.rooms}</span></td>
    </tr>

  )
}

ListApartmentItem.propTypes = {
  apartment: PropTypes.object,
  getSelectedId: PropTypes.func
}

export default ListApartmentItem
