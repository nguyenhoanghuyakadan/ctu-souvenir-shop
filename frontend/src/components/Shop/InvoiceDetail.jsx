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
  console.log(products);

  const totalAmount = data
    ? data.products.reduce((total, product) => {
        const productPrice =
          products.find((p) => p._id === product.product)?.discountPrice || 0;
        return total + product.quantity * productPrice;
      }, 0)
    : 0;

  return (
    <div className="bg-white border rounded-lg shadow-lg px-6 py-8 max-w-md mx-auto my-8">
      <h1 className="font-bold text-2xl my-4 text-center text-blue-600">
        {data && data.type === "Purchase" && data.supplier}
        {data && data.type === "Sale" && seller && seller.name}
      </h1>
      <hr className="mb-2" />
      <div className="flex justify-between mb-6">
        <h1 className="text-lg font-bold">
          {data && data.type === "Purchase" && "Hóa Đơn Nhập Hàng"}
          {data && data.type === "Sale" && "Hóa Đơn Bán Hàng"}
        </h1>
        <div className="text-gray-700">
          <div>Ngày nhập: {data && data.date}</div>
          <div>Số hóa đơn: {data && data._id}</div>
        </div>
      </div>
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-4">Người nhận hóa đơn:</h2>
        {data && data.type === "Purchase" && seller && (
          <>
            <div className="text-gray-700 mb-2">{seller.name}</div>
            <div className="text-gray-700 mb-2">{seller.address}</div>
            <div className="text-gray-700 mb-2">{seller.phoneNumber}</div>
            <div className="text-gray-700">{seller.email}</div>
          </>
        )}
        {data && data.type === "Sale" && (
          <>
            <div className="text-gray-700 mb-2">{data.customer.name}</div>
            <div className="text-gray-700 mb-2">
              {data.customer.phoneNumber}
            </div>
            <div className="text-gray-700">{data.customer.email}</div>
          </>
        )}
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
                      ?.discountPrice}
                </td>
                <td className="text-right text-gray-700">
                  $
                  {product.quantity *
                    products.find((p) => p._id === product.product)
                      ?.discountPrice}
                </td>
              </tr>
            ))}
        </tbody>
        <tfoot>
          <tr>
            <td className="text-left font-bold text-gray-700">Total</td>
            <td className="text-center font-bold text-gray-700"></td>
            <td className="text-center font-bold text-gray-700"></td>
            <td className="text-right font-bold text-gray-700">
              ${totalAmount.toFixed(2)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default InvoiceDetail;
