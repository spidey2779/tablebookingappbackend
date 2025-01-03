import mongoose, { Schema, Document } from "mongoose";
export interface IBooking extends Document {
  tableId: string;
  userId: string;
  date: string;
  startTime: string;
  endTime: string;
  guests: number;
}
const BookingSchema: Schema = new Schema({
  tableId: { type:String, required: true },
  userId: { type: String, required: true },
  date: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  guests: { type: Number, required: true },
});

export default mongoose.model<IBooking>("Booking", BookingSchema);
