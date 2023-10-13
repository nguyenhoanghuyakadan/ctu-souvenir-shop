import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createInvoice } from "../../redux/actions/invoice";
import { getAllProductsShop } from "../../redux/actions/product";
import { toast } from "react-toastify";

const CreateInvoice = () => {
  const { seller } = useSelector((state) => state.seller);
  const { success, error } = useSelector((state) => state.invoices);
  const productsFromServer = useSelector((state) => state.products); // Lấy danh sách sản phẩm từ Redux store
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [supplier, setSupplier] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Invoice created successfully!");
      // Redirect to the invoice list page or perform any other desired action.
    }
  }, [dispatch, error, success]);

  useEffect(() => {
    dispatch(getAllProductsShop(seller._id)); // Thay seller._id bằng ID cần truy vấn

    console.log(productsFromServer);
  }, [dispatch, seller._id]);

  const handleProductChange = (e) => {
    const selectedProducts = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );
    setProducts(selectedProducts);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newInvoiceData = {
      products,
      supplier,
      date,
      shopId: seller._id,
    };

    dispatch(createInvoice(newInvoiceData));
  };

  return (
    <div className="w-[90%] 800px:w-[50%] bg-white shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
      <h5 className="text-[30px] font-Poppins text-center">Tạo phiếu nhập</h5>
      <form onSubmit={handleSubmit}>
        <br />
        <div>
          <label className="pb-2">
            Chọn sản phẩm <span className="text-red-500">*</span>
          </label>
          <select
            multiple
            className="w-full mt-2 border h-[100px] rounded-[5px]"
            onChange={handleProductChange}
          >
            {Array.isArray(productsFromServer.allProducts) &&
              productsFromServer.allProducts.map((product) => (
                <option key={product._id} value={product._id}>
                  {product.name}{" "}
                  {/* Sử dụng tên sản phẩm hoặc trường khác nếu cần */}
                </option>
              ))}

            {/* Render a list of products here, where each option has a value of the product's ID */}
          </select>
        </div>
        <br />
        <div>
          <label className="pb-2">
            Nhà cung cấp <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={supplier}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setSupplier(e.target.value)}
            placeholder="Nhập tên nhà cung cấp..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Ngày nhập <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={date}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <br />
        <div>
          <input
            type="submit"
            value="Tạo phiếu nhập"
            className="mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateInvoice;
