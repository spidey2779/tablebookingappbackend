import mongoose, { Document, Schema } from "mongoose";
export interface ITable extends Document {
  tableId: string;
  capacity: number;
}

const TableSchema: Schema = new Schema({
  tableId: { type: String, required: true, unique: true },
  capacity: { type: Number, required: true },
});

export default mongoose.model<ITable>("Table", TableSchema);
