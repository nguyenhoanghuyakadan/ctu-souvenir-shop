const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  supplier: {
    type: String,
    default: "Handmade",
  },
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shop",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  // Các trường khác muốn bổ sung vào phiếu nhập, ví dụ: số hóa đơn, ghi chú, v.v.
});

module.exports = mongoose.model("Invoice", invoiceSchema);
