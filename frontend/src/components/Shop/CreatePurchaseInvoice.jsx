import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { createPurchaseInvoice } from "../../redux/actions/invoice";
import { getAllProductsShop } from "../../redux/actions/product";
import { toast } from "react-toastify";

import { suppliersData } from "../../static/data";

const CreatePurchaseInvoice = () => {
  const { seller } = useSelector((state) => state.seller);
  const { success, error } = useSelector((state) => state.invoices);
  const productsFromServer = useSelector((state) => state.products); // Lấy danh sách sản phẩm từ Redux store
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    type: "Purchase",
    products: [], // Sử dụng products thay vì item
    shopId: seller._id, // Thêm field shopId
    date: "", // Thêm field date
    product: "",
    supplier: "",
  });

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Product created successfully!");
      navigate("/dashboard");
      window.location.reload();
    }
  }, [dispatch, error, success]);

  useEffect(() => {
    dispatch(getAllProductsShop(seller._id)); // Thay seller._id bằng ID cần truy vấn
  }, [dispatch, seller._id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddProduct = () => {
    const { product, quantity, price } = formData;
    if (product && quantity && price) {
      const productData = { product, quantity, price };
      setFormData({
        ...formData,
        products: [...formData.products, productData],
      });
    }
    console.log(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPurchaseInvoice(formData));
    console.log(formData)
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold">Thêm phiếu nhập</h1>
      <form onSubmit={handleSubmit} className="mt-4 p-4 bg-gray-100 rounded-lg">
        <label>Sản phẩm</label>
        <select
          name="product"
          value={formData.product}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        >
          <option value="">-- Chọn một mục --</option>
          {productsFromServer.allProducts.map((product) => (
            <option key={product._id} value={product._id}>
              {product.name}
            </option>
          ))}
        </select>
        <label>Số lượng</label>
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleInputChange}
          placeholder="Quantity"
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <label>Giá</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          placeholder="Price"
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <button
          type="button"
          onClick={handleAddProduct}
          className="bg-blue text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
        >
          Thêm sản phẩm
        </button>
        <label className="block">Nhà cung cấp</label>
        <select
          name="supplier"
          value={formData.supplier}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        >
          <option value="">-- Chọn một mục --</option>
          {suppliersData.map((supplier) => (
            <option key={supplier.id} value={supplier.name}>
              {supplier.name}
            </option>
          ))}
        </select>
        <label className="block">Ngày nhập</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          placeholder="Date"
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Tạo phiếu nhập
        </button>
      </form>
      <table className="mt-4 w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Sản phẩm</th>
            <th className="p-2">Số lượng</th>
            <th className="p-2">Giá</th>
          </tr>
        </thead>
        <tbody>
          {formData.products.map((productData, index) => (
            <tr key={index} className="border-t">
              <td className="p-2">
                {
                  productsFromServer.allProducts.find(
                    (product) => product._id === productData.product
                  )?.name
                }
              </td>
              <td className="p-2 text-center">{productData.quantity}</td>
              <td className="p-2 text-center">{productData.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CreatePurchaseInvoice;
