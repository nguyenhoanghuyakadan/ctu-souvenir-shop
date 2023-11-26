import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect, useState } from "react";
import { FaFilePen, FaLink, FaTrash, FaEye } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllProductsShop } from "../../redux/actions/product";
import { deleteProduct } from "../../redux/actions/product";
import { updateProduct } from "../../redux/actions/product";
import Loader from "../Layout/Loader";
import currency from "currency-formatter";
import { toast } from "react-toastify";

const AllProducts = () => {
  const { products, isLoading, success, error } = useSelector(
    (state) => state.products
  );
  const { seller } = useSelector((state) => state.seller);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [updateData, setUpdateData] = useState({
    price: null,
    isActive: null,
    shopId: seller._id,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllProductsShop(seller._id));
  }, [dispatch]);

  const handleChangeCheckbox = (e) => {
    setUpdateData({
      ...updateData,
      isActive: e.target.checked,
    });
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    window.location.reload();
  };

  const handleUpdate = () => {
    dispatch(updateProduct(selectedProduct._id, updateData));
    setSelectedProduct(null);
    toast.success("Sản phẩm đã được cập nhật thành công!");
    navigate(`/product/${selectedProduct._id}`);
    window.location.reload();
  };

  const columns = [
    { field: "id", headerName: "ID SP", hide: true },
    {
      field: "name",
      headerName: "Tên sản phẩm",
      flex: 2,
    },
    {
      field: "price",
      headerName: "Giá",
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Số lượng",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },

    {
      field: "sold",
      headerName: "Đã bán",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
    {
      field: "update",
      flex: 1,
      headerName: "Sửa",
      headerAlign: "left",
      align: "left",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button
              onClick={() =>
                setSelectedProduct(products.find((p) => p._id === params.id))
              }
            >
              <FaFilePen size={20} />
            </Button>
          </>
        );
      },
    },
    {
      field: "delete",
      flex: 1,
      headerName: "Xóa",
      type: "number",
      headerAlign: "left",
      align: "left",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleDelete(params.id)}>
              <FaTrash size={20} />
            </Button>
          </>
        );
      },
    },
    {
      field: "detail",
      headerName: "Chi tiết",
      flex: 1,
      headerAlign: "left",
      align: "left",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/product/${params.id}`}>
              <Button>
                <FaLink size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
    {
      field: "isActive",
      headerName: "Active",
      flex: 1,
      headerAlign: "left",
      align: "left",
      sortable: false,
      renderCell: (params) => {
        return <>{params.row.isActive ? <FaEye size={20} /> : null}</>;
      },
    },
  ];

  const row = [];

  products &&
    products.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: `${currency.format(item.price, {
          code: "VND",
        })}`,
        stock: item.stock,
        sold: item?.sold_out,
        isActive: item.isActive,
      });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-4 bg-white">
          <div className="my-4 text-xl font-bold uppercase">
            Tất cả sản phẩm
          </div>
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />

          {selectedProduct && (
            <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex items-center justify-center z-[9999]">
              <div className="bg-white p-4 rounded-md">
                <h2 className="text-xl font-bold uppercase text-center">
                  Cập nhật sản phẩm
                </h2>
                <div className="my-4">
                  <label htmlFor="productPrice" className="font-bold">
                    Giá:
                  </label>
                  <input
                    type="number"
                    id="productPrice"
                    value={updateData.price}
                    onChange={(e) =>
                      setUpdateData({
                        ...updateData,
                        price: e.target.value,
                      })
                    }
                    className="input input-bordered input-warning w-full max-w block"
                    placeholder={selectedProduct.price}
                  />
                </div>
                <div className="my-4">
                  {/* Thêm input checkbox và kết nối với hàm handleChangeCheckbox */}
                  <label htmlFor="isActive" className="font-bold">
                    Trạng thái:
                  </label>
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={updateData.isActive}
                    onChange={handleChangeCheckbox}
                    className="checkbox checkbox-success block"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={handleUpdate}
                    className="btn btn-success font-bold text-white uppercase"
                  >
                    Cập nhật
                  </button>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="btn btn-error font-bold text-white uppercase"
                  >
                    Hủy
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AllProducts;
