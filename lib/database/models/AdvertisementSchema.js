import mongoose from 'mongoose';

const AdvertisementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  isActive: { type: Boolean, default: false },
  addType: {
    type: String,
    enum: ['Two-Wheeler', 'Four-Wheeler', 'Commercial Vehicle'],
    default: 'Two-Wheeler',
  },
  uploadedImages:{
    type:[String],
    required:true
},

}, { timestamps: true });

export default mongoose.models.Advertisement || mongoose.model('Advertisement', AdvertisementSchema);
