import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect } from "react";
import { AiOutlineEye, AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllInvoicesShop } from "../../redux/actions/invoice";
import Loader from "../Layout/Loader";
import currency from "currency-formatter";

const AllInvoices = () => {
  const { invoices, isLoading } = useSelector((state) => state.invoices);
  const { seller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllInvoicesShop(seller._id));
  }, [dispatch]);

  console.log(invoices);

  const columns = [
    { field: "id", headerName: "Số hóa đơn", minWidth: 150, flex: 0.7 },
    { field: "date", headerName: "Ngày nhập", minWidth: 150, flex: 0.7 },
    { field: "type", headerName: "Loại hóa đơn", minWidth: 150, flex: 0.7 }, // Add "Loại hóa đơn" column
    {
      field: "view",
      headerName: "Xem",
      sortable: false,
      minWidth: 100,
      flex: 0.3,
      renderCell: (params) => (
        <Link to={`/invoice/${params.row.id}`}>
          <Button>
            <AiOutlineEye />
          </Button>
        </Link>
      ),
    },
  ];

  const rows = invoices
    ? invoices.map((item) => ({
        id: item._id,
        date: item.date,
        type: item.type, // Add "type" field to rows
      }))
    : [];

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
