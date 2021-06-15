import mongoose from 'mongoose'
import dotenv from 'dotenv'
import users from './data/users.js'
import apartments from './data/apartments.js'
import User from './models/userModel.js'
import Apartment from './models/apartmentModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await Apartment.deleteMany()
    await User.deleteMany()

    const createdUsers = await User.insertMany(users)

    await Apartment.insertMany(apartments)

    console.log('Data Imported!')
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Apartment.deleteMany()
    await User.deleteMany()

    console.log('Data Destroyed!')
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
