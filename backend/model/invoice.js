const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Purchase", "Sale"], // Define values for type as needed
    required: true,
  },
  products: [
    {
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
    },
  ],
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shop",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  supplier: {
    type: String,
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Tham chiếu đến mô hình User
  },
});

invoiceSchema.pre("save", function (next) {
  if (this.type !== "Purchase") {
    this.supplier = undefined;
  }
  next();
});

// Thêm một hàm middleware để kiểm tra và đảm bảo rằng trường "customer" chỉ có giá trị khi "type" là "Sale".
invoiceSchema.pre("save", function (next) {
  if (this.type !== "Sale") {
    this.customer = undefined;
  }
  next();
});

module.exports = mongoose.model("Invoice", invoiceSchema);
