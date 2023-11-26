import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect } from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProductsShop } from "../../redux/actions/product";
import { deleteProduct } from "../../redux/actions/product";
import Loader from "../Layout/Loader";
import axios from "axios";
import { server } from "../../server";
import { useState } from "react";
import currency from "currency-formatter";

const AllProducts = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${server}/product/admin-all-products`, { withCredentials: true })
      .then((res) => {
        setData(res.data.products);
      });
  }, []);

  const columns = [
    { field: "id", headerName: "ID Sản phẩm", flex: 2 },
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
      field: "Stock",
      headerName: "Số lượng",
      headerAlign: "left",
      align: "left",
      type: "number",
      flex: 1,
    },

    {
      field: "sold",
      headerName: "Đã bán",
      headerAlign: "left",
      align: "left",
      type: "number",
      flex: 1,
    },
    {
      field: "view",
      flex: 1,
      headerName: "Xem",
      headerAlign: "left",
      align: "left",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/product/${params.id}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  data &&
    data.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: `${currency.format(item.price, {
          code: "VND",
        })}`,
        Stock: item.stock,
        sold: item?.sold_out,
      });
    });

  return (
    <div className="w-full m-4 bg-white">
      <h3 className="text-xl font-bold uppercase">Tất cả sản phẩm</h3>
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

export default AllProducts;
