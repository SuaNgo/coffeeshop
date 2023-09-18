import mongoose, { model, Schema, models } from "mongoose";

const ProductSchema = new Schema(
  {
    product: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    images: [{ type: String }],
    category: { type: mongoose.Types.ObjectId, ref: "Category" },
    properties: { type: String },
    discount: { type: Number },
    quantity: { type: Number },
  },
  {
    timestamps: true,
  }
);

export const Product = models.Product || model("Product", ProductSchema);
