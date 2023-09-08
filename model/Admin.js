import { model, Schema, models } from "mongoose";

const AdminSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

export const Admin = models.Admin || model("Admin", AdminSchema);
