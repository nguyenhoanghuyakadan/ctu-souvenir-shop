import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllInvoicesShop } from "../../redux/actions/invoice";
import { getAllProductsShop } from "../../redux/actions/product";
const InvoiceDetail = () => {
  const { invoices, isLoading } = useSelector((state) => state.invoices);
  const { products } = useSelector((state) => state.products);
  const { seller } = useSelector((state) => state.seller);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllInvoicesShop(seller._id));
    dispatch(getAllProductsShop(seller._id));
  }, [dispatch]);

  const data = invoices && invoices.find((item) => item._id === id);

  console.log(data);

  const totalAmount =
    data &&
    Array.isArray(data.products) &&
    data.products.reduce((total, product) => {
      const productPrice =
        products.find((p) => p._id === product.product)?.originalPrice || 0;
      return total + product.quantity * productPrice;
    }, 0);

  // const totalAmount = [];

  return (
    <div className="bg-white border rounded-lg shadow-lg px-6 py-8 max-w-md mx-auto my-8">
      <h1 className="font-bold text-2xl my-4 text-center text-blue-600">
        {data && data.type === "Purchase" && data.supplier}
        {data && data.type === "Sale" && seller && seller.name}
      </h1>
      <hr className="mb-2" />
      <div className="flex flex-col justify-between mb-6">
        <h1 className="text-lg font-bold text-center">Hóa Đơn Bán Hàng</h1>
        <div className="text-gray-700">
          <div>Ngày nhập: {data && data.date.slice(0, 10)}</div>
          <div>Số hóa đơn: {data && data.invoiceNumber}</div>
          {data && data.type === "Purchase" && seller && (
            <>
              <div>Khách hàng: {seller.name}</div>
              <div>Địa chỉ: {seller.address}</div>
              <div>Điện thoại: {seller.phoneNumber}</div>
            </>
          )}
          {data && data.type === "Sale" && (
            <>
              <div>Khách hàng: {data.customer.name}</div>
              <div>Email: {data.customer.email}</div>
            </>
          )}
        </div>
      </div>
      <table className="w-full mb-8">
        <thead>
          <tr>
            <th className="text-left font-bold text-gray-700">Tên sản phẩm</th>
            <th className="text-center font-bold text-gray-700">Số lượng</th>
            <th className="text-center font-bold text-gray-700">Đơn giá</th>
            <th className="text-right font-bold text-gray-700">Tổng</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.products.map((product) => (
              <tr key={product._id}>
                <td className="text-left text-gray-700">
                  {products &&
                    products.find((p) => p._id === product.product) &&
                    products.find((p) => p._id === product.product)?.name}
                </td>
                <td className="text-center text-gray-700">
                  {product.quantity}
                </td>
                <td className="text-center text-gray-700">
                  {products &&
                    products.find((p) => p._id === product.product) &&
                    products.find((p) => p._id === product.product)
                      ?.originalPrice}
                </td>
                <td className="text-right text-gray-700">
                  {product.quantity *
                    products.find((p) => p._id === product.product)
                      ?.originalPrice}
                </td>
              </tr>
            ))}
        </tbody>
        <tfoot>
          <tr>
            <td className="text-left font-bold text-gray-700">Tổng</td>
            <td className="text-center font-bold text-gray-700"></td>
            <td className="text-center font-bold text-gray-700"></td>
            <td className="text-right font-bold text-gray-700">
              {data && totalAmount.toFixed(2)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default InvoiceDetail;
