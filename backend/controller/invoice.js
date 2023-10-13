const express = require("express");
const router = express.Router();
const Invoice = require("../model/invoice");
const Product = require("../model/product");
const Shop = require("../model/shop");

// Tạo phiếu nhập mới
router.post("/create-invoice", async (req, res) => {
  try {
    const { product, quantity, price, supplier, shopId } = req.body;

    // Tìm thông tin cửa hàng dựa trên shopId
    const shop = await Shop.findById(shopId);
    if (!shop) {
      return res.status(404).json({ error: "Shop not found" });
    }

    const newInvoice = new Invoice({
      product,
      quantity,
      price,
      supplier,
      shop: shop._id,
    });
    await newInvoice.save();

    // Cập nhật thông tin sản phẩm và phiếu nhập trong mô hình sản phẩm
    await Product.findByIdAndUpdate(product, {
      $push: { invoices: { invoice: newInvoice._id } },
      $inc: { stock: quantity },
    });

    res.status(201).json(newInvoice);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Lấy danh sách phiếu nhập
router.get("/get-all-invoices", async (req, res) => {
  try {
    const invoices = await Invoice.find().populate("product").populate("shop");
    res.status(200).json(invoices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Lấy thông tin chi tiết của một phiếu nhập
router.get("/get-invoice/:id", async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id)
      .populate("product")
      .populate("shop");
    if (!invoice) {
      return res.status(404).json({ error: "Invoice not found" });
    }
    res.status(200).json(invoice);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Cập nhật thông tin phiếu nhập
router.put("/invoices/:id", async (req, res) => {
  // Xử lý cập nhật phiếu nhập ở đây
});

// Xóa phiếu nhập
router.delete("/invoices/:id", async (req, res) => {
  // Xử lý xóa phiếu nhập ở đây
});

module.exports = router;
