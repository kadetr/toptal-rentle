import React from 'react'

const ListApartmentItem = ({ apartment, getSelectedId }) => {
  return (<>
    <td className=" py-2 px-0">
      <span onClick={()=>{getSelectedId(apartment._id)}} style={{"cursor": "pointer"}}>{apartment.name}</span></td>
    <td className=" py-2 px-0" >
    <span onClick={()=>{getSelectedId(apartment._id)}} style={{"cursor": "pointer", display: "flex", justifyContent: "center"}}>{apartment.price}</span></td>
    <td className=" py-2 px-0">
    <span onClick={()=>{getSelectedId(apartment._id)}} style={{"cursor": "pointer", display: "flex", justifyContent: "center"}}>{apartment.size}</span></td>
    <td className=" py-2 px-0">
    <span onClick={()=>{getSelectedId(apartment._id)}} style={{"cursor": "pointer", display: "flex", justifyContent: "center"}}>{apartment.rooms}</span></td></>

  )
}

export default ListApartmentItem
