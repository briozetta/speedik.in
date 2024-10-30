import { Schema, model, models } from 'mongoose';

const VehicleSchema = new Schema({
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  
uploadedImages:{
    type:[String],
    required:true
},
  year: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  kilometers: {
    type: Number,
    required: true,
  },
  colour: {
    type: String,
    required: true,
  },
  condition: {
    type: String,
    required: true,
  },
  fuelType: {
    type: String,
    required: true,
  },
  transmissionType: {
    type: String,
    required: true,
  },
  ownership: {
    type: String,
    required: true,
  },
  vehicleType: {
    type: String,
    enum: ['Two-Wheeler', 'Four-Wheeler', 'Commercial Vehicle'],
    required: true,
  },
  primaryContact: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /\d{10}/.test(v); // Validate 10-digit phone number
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  secondaryContact: {
    type: String,
  },
  fullname: {
    type: String,
    required: true,
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',  // Reference to the User model
    required: true,
  },
},{timestamps:true});

const Vehicle = models.Vehicle || model('Vehicle', VehicleSchema);
export default Vehicle;
