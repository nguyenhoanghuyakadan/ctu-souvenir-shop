import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { createPurchaseInvoice } from "../../redux/actions/invoice";
import { getAllProductsShop } from "../../redux/actions/product";
import { toast } from "react-toastify";
import { suppliersData } from "../../static/data";
import { server } from "../../server";

const CreatePurchaseInvoice = () => {
  const [date, setDate] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [supplier, setSupplier] = useState("");
  const [products, setProducts] = useState([
    { id: 1, product: "", quantity: "", price: "" },
  ]);

  const [rowsToDelete, setRowsToDelete] = useState([]);
  const [isDeleteButtonVisible, setIsDeleteButtonVisible] = useState(false);

  const { success, error } = useSelector((state) => state.invoices);
  const { seller } = useSelector((state) => state.seller);
  const productsFromServer = useSelector((state) => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formatDateToISOString = (inputDate) => {
    // Tạo một đối tượng Date từ ngày đầu vào
    const inputDateObj = new Date(inputDate);

    // Kiểm tra nếu ngày đầu vào là hợp lệ
    if (!isNaN(inputDateObj.getTime())) {
      // Chuyển đổi ngày thành chuỗi ISO 8601
      const isoString = inputDateObj.toISOString();
      return isoString;
    } else {
      // Trả về null nếu ngày không hợp lệ
      return null;
    }
  };

  const getNextInvoiceNumber = async () => {
    try {
      const response = await axios.get(
        `${server}/invoice/get-next-invoice-number/${seller._id}`,
        { withCredentials: true }
      );
      if (response.data && response.data.nextInvoiceNumber) {
        setInvoiceNumber(response.data.nextInvoiceNumber); // Cập nhật state với số hóa đơn mới nhất
      }
    } catch (error) {
      console.error("Lỗi khi lấy số hóa đơn từ API:", error);
    }
  };

  useEffect(() => {
    getNextInvoiceNumber();
  }, []);

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

  useEffect(() => {
    setIsDeleteButtonVisible(products.length > 1);
  }, [products]);

  const handleAddRow = () => {
    const newId = products[products.length - 1].id + 1;
    setProducts([
      ...products,
      { id: newId, product: "", quantity: "", price: "" },
    ]);
  };

  const handleDeleteRow = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
    setRowsToDelete([...rowsToDelete, id]);
  };

  const handleInputChange = (id, field, value) => {
    const updatedProducts = products.map((product) => {
      if (product.id === id) {
        return { ...product, [field]: value };
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  const handleDateChange = (value) => {
    setDate(value);
  };

  const handleInvoiceNumberChange = (value) => {
    setInvoiceNumber(value);
  };

  const handleSupplierChange = (value) => {
    setSupplier(value);
  };

  const handleSave = () => {
    const isoDate = formatDateToISOString(date);

    const dataToSend = {
      type: "Purchase",
      invoiceNumber,
      shopId: seller._id,
      date: isoDate,
      supplier,
      products,
    };
    console.log("Dữ liệu được gửi lên server:", dataToSend);

    dispatch(createPurchaseInvoice(dataToSend));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <label className="text-lg">Ngày nhập:</label>
        <input
          type="date"
          className="w-full p-2 border rounded"
          value={date}
          onChange={(e) => handleDateChange(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="text-lg">Số hóa đơn:</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={invoiceNumber}
          onChange={(e) => handleInvoiceNumberChange(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="text-lg">Nhà cung cấp:</label>
        <select
          className="w-full p-2 border rounded"
          value={supplier}
          onChange={(e) => handleSupplierChange(e.target.value)}
        >
          <option value="">-- Chọn một mục --</option>
          {suppliersData.map((supplier) => (
            <option key={supplier.id} value={supplier.name}>
              {supplier.name}
            </option>
          ))}
        </select>
      </div>
      <table className="w-full border-collapse mb-4">
        <thead>
          <tr>
            <th className="p-2">STT</th>
            <th className="p-2">Tên sản phẩm</th>
            <th className="p-2">Số lượng</th>
            <th className="p-2">Giá</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="p-2">{product.id}</td>
              <td className="p-2">
                <select
                  value={product.name}
                  onChange={(e) =>
                    handleInputChange(product.id, "product", e.target.value)
                  }
                  className="w-full p-2 border rounded"
                >
                  <option value="">Chọn sản phẩm</option>
                  {productsFromServer.allProducts.map((product, index) => (
                    <option key={index} value={product._id}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </td>
              <td className="p-2">
                <input
                  type="text"
                  value={product.quantity}
                  onChange={(e) =>
                    handleInputChange(product.id, "quantity", e.target.value)
                  }
                  className="w-full p-2 border rounded"
                />
              </td>
              <td className="p-2">
                <input
                  type="text"
                  value={product.price}
                  onChange={(e) =>
                    handleInputChange(product.id, "price", e.target.value)
                  }
                  className="w-full p-2 border rounded"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-center">
        <button onClick={handleAddRow} className="btn btn-info mb-4 text-white">
          Thêm dòng
        </button>
      </div>
      <div className="text-center">
        {isDeleteButtonVisible && (
          <button
            onClick={() => handleDeleteRow(products[products.length - 1].id)}
            className="btn btn-error mb-4 text-white"
          >
            Xóa dòng
          </button>
        )}
      </div>
      <div className="text-right">
        <button
          onClick={handleSave}
          className="btn btn-success mb-4 text-white"
        >
          Lưu
        </button>
      </div>
    </div>
  );
};

export default CreatePurchaseInvoice;
