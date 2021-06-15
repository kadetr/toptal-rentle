import mongoose from "mongoose";

const apartmentModel = mongoose.Schema(
   {

      name: { type: String, required: true },
      description: { type: String },
      price: {type: Number, required: true},
      size: { type: Number, required: true },
      rooms: { type: Number, required: true },
      geolocation: { 
          lng:{type: Number, required: true},
          lat:{type: Number, required: true } 
      },
      rName: { type: String, required: true},
      isRented:{type: Boolean, default: false}
   },
   {
      timestamps: true,
   }
);

const Apartment = mongoose.model("Apartment", apartmentModel);

export default Apartment;
