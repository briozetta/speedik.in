import mongoose from 'mongoose';

const AdvertisementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  isActive: { type: Boolean, default: false },
  addType: {
    type: String,
    enum: ["Two Wheeler Top", "Four Wheeler Top", "Commercial Wheeler Top"],
    default: "Two Wheeler Top",
  },
  uploadedImages:{
    type:[String],
    required:true
},

}, { timestamps: true });

export default mongoose.models.Advertisement || mongoose.model('Advertisement', AdvertisementSchema);
