const express = require("express");
const { isSeller, isAuthenticated, isAdmin } = require("../middleware/auth");
const router = express.Router();
const Invoice = require("../model/invoice");
const Product = require("../model/product");
const Shop = require("../model/shop");

// Tạo hóa đơn mới (bao gồm cả nhập và bán)
router.post("/create-purchase-invoice", isSeller, async (req, res) => {
  try {
    const { type, products, shopId, date, supplier } = req.body; // Dữ liệu được gửi từ phía client

    // Tìm thông tin cửa hàng dựa trên shopId
    const shop = await Shop.findById(shopId);
    if (!shop) {
      return res.status(404).json({ error: "Shop not found" });
    }

    const combinedInvoices = [];
    for (const productData of products) {
      const { product, quantity, price } = productData;
      const existingInvoice = combinedInvoices.find(
        (invoice) =>
          invoice.type === type &&
          invoice.shop.toString() === shopId.toString() &&
          invoice.date.toString() === date.toString() &&
          invoice.supplier.toString() === supplier.toString()
      );

      if (existingInvoice) {
        existingInvoice.products.push({ product, quantity, price });
      } else {
        combinedInvoices.push({
          type,
          shop: shopId,
          date,
          supplier,
          products: [{ product, quantity, price }],
        });
      }
    }

    const createdInvoices = await Invoice.insertMany(combinedInvoices);
    console.log(createdInvoices);
    for (const createdInvoice of createdInvoices) {
      for (const productData of createdInvoice.products) {
        const { product, quantity, price } = productData;
        const productDoc = await Product.findById(product);
        if (
          productDoc &&
          typeof productDoc.stock !== "undefined" &&
          typeof quantity !== "undefined"
        ) {
          if (type === "Purchase") {
            await Product.findByIdAndUpdate(
              productDoc._id,
              { $inc: { stock: quantity } },
              { new: true }
            );
          }
          await Product.findByIdAndUpdate(productDoc._id, {
            $push: {
              invoices: { invoice: createdInvoice._id, quantity, price },
            },
          });
        }
      }
    }

    res.status(200).json({ message: `${type} invoice successful` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `An error occurred while ${type} invoice` });
  }
});

// Lấy tất cả hóa đơn của cửa hàng với ID tương ứng
router.get("/get-all-invoices-shop/:id", isSeller, async (req, res) => {
  try {
    const shopId = req.params.id;

    // Kiểm tra xem cửa hàng có tồn tại không
    const shop = await Shop.findById(shopId);
    if (!shop) {
      return res.status(404).json({ error: "Shop not found" });
    }

    // Tìm tất cả các hóa đơn của cửa hàng với ID tương ứng
    const invoices = await Invoice.find({ shop: shopId }).populate("customer");

    res.status(200).json(invoices);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while retrieving invoices for the shop",
    });
  }
});

// Các tuyến đường khác giữ nguyên

// Cập nhật thông tin hóa đơn
router.put("/invoices/:id", async (req, res) => {
  // Xử lý cập nhật hóa đơn ở đây
});

// Xóa hóa đơn
router.delete("/invoices/:id", async (req, res) => {
  // Xử lý xóa hóa đơn ở đây
});

module.exports = router;
