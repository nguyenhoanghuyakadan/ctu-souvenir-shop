import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect } from "react";
import { AiOutlineEye, AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllInvoicesShop } from "../../redux/actions/invoice"; // Import action for getting invoices
import Loader from "../Layout/Loader";
import currency from "currency-formatter";

const AllInvoices = () => {
  const { invoices, isLoading } = useSelector((state) => state.invoices);
  const { seller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllInvoicesShop(seller._id)); // Fetch invoices for the shop
    console.log(invoices);
  }, [dispatch, seller._id]);

  const columns = [
    { field: "id", headerName: "ID Phiếu", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Sản phẩm",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "Stock",
      headerName: "Số lượng",
      type: "number",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "price",
      headerName: "Giá",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "supplier",
      headerName: "Nhà cung cấp",
      minWidth: 120,
      flex: 0.7,
    },
  ];

  const rows = [];
  invoices &&
    invoices.forEach((item) => {
      console.log(item.product);
      rows.push({
        id: item._id,
        name: item.product.name,
        Stock: item.quantity,
        price: `${currency.format(item.price, {
          code: "VND",
        })}`,
        supplier: item.supplier,
      });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
      )}
    </>
  );
};

export default AllInvoices;
