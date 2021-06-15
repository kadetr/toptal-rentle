import asyncHandler from 'express-async-handler'
import Apartment from '../models/apartmentModel.js'

// @desc    Fetch all apartments
// @route   GET /api/apartments
// @access  Public/Client
const getApartments = asyncHandler(async (req, res) => {
  const pageSize = 50
  const page = Number(req.query.pageNumber) || 1
  let flag = false 
  if(req.query.flag==="true") flag = true

  const count = await Apartment.countDocuments()
  const apartments = await Apartment.find(!flag ?{isRented:false}: {})
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ apartments, page, pages: Math.ceil(count / pageSize) })
})



// @desc    Fetch single apartment
// @route   GET /api/apartments/:id
// @access  Public/Client
const getApartmentById = asyncHandler(async (req, res) => {
    const apartment = await Apartment.findById(req.params.id)
  
    if (apartment) {
      res.json(apartment)
    } else {
      res.status(404)
      throw new Error('Apartment not found')
    }
  })

// @desc    Delete apartment
// @route   DELETE /api/apartments/:id
// @access  Private/Realtor
const deleteApartment = asyncHandler(async (req, res) => {
    const apartment = await Apartment.findById(req.params.id);
 
    if (apartment) {
       await apartment.remove();
       res.json({ message: "Apartment removed" });
    } else {
       res.status(404);
       throw new Error("Apartment not found");
    }
 });


// @desc    Create apartment
// @route   POST /api/apartments/:id
// @access  Private/Realtor
 const createApartment = asyncHandler(async (req, res) => {
    const { name, description, price, size, rooms, geolocation, rName, isRented } = req.body;
    const apartment = await Apartment.create({
        name, 
        description, 
        price,
        size, 
        rooms, 
        geolocation, 
        rName,
        isRented
    });
 });

// @desc    Update apartment
// @route   PUT /api/apartments/:id
// @access  Private/Realtor
const updateApartment = asyncHandler(async (req, res) => {
    const {
      name,
      description,
      price,
      size,
      rooms,
      geolocation,
      rName,
      isRented
    } = req.body
  
    const apartment = await Apartment.findById(req.params.id)
  
    if (apartment) {
      apartment.name = name
      apartment.price = price
      apartment.description = description
      apartment.size = size
      apartment.rooms = rooms
      apartment.geolocation = geolocation
      apartment.rName = rName
      apartment.isRented = isRented
  
      const updatedApartment = await apartment.save()
      res.json(updatedApartment)
    } else {
      res.status(404)
      throw new Error('Apartment not found')
    }
  })

  export {
    getApartments,
    getApartmentById,
    deleteApartment,
    createApartment,
    updateApartment,
  }