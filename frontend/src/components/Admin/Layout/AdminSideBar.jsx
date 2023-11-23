import React from "react";
import { FiShoppingBag } from "react-icons/fi";
import { GrWorkshop } from "react-icons/gr";
import { RxDashboard } from "react-icons/rx";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { Link } from "react-router-dom";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BsHandbag } from "react-icons/bs";
import { AiOutlineSetting } from "react-icons/ai";
import { FaFileInvoice } from "react-icons/fa6";

const AdminSideBar = ({ active }) => {
  return (
    <div className="w-full bg-white shadow-sm sticky top-0 left-0 z-10">
      {/* single item */}
      <div className="w-full flex items-center p-4 hover:bg-neutral-content">
        <Link to="/admin/dashboard" className="w-full flex items-center">
          <RxDashboard size={30} />
          <h5
            className={`hidden 800px:block text-xl px-2 ${
              active === 1 ? "text-info font-bold" : " "
            }`}
          >
            Dashboard
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4 hover:bg-neutral-content">
        <Link to="/admin-orders" className="w-full flex items-center">
          <FiShoppingBag size={30} />
          <h5
            className={`hidden 800px:block text-xl px-2 ${
              active === 2 ? "text-info font-bold" : " "
            }`}
          >
            Đơn hàng
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4 hover:bg-neutral-content">
        <Link to="/admin-sellers" className="w-full flex items-center">
          <GrWorkshop size={30} />
          <h5
            className={`hidden 800px:block text-xl px-2 ${
              active === 3 ? "text-info font-bold" : " "
            }`}
          >
            Quản lý người bán
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4 hover:bg-neutral-content">
        <Link to="/admin-users" className="w-full flex items-center">
          <HiOutlineUserGroup size={30} />
          <h5
            className={`hidden 800px:block text-xl px-2 ${
              active === 4 ? "text-info font-bold" : " "
            }`}
          >
            Người dùng
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4 hover:bg-neutral-content">
        <Link to="/admin-products" className="w-full flex items-center">
          <BsHandbag size={30} />
          <h5
            className={`hidden 800px:block text-xl px-2 ${
              active === 5 ? "text-info font-bold" : " "
            }`}
          >
            Sản phẩm
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4 hover:bg-neutral-content">
        <Link to="/admin-invoices" className="w-full flex items-center">
          <FaFileInvoice size={30} />
          <h5
            className={`hidden 800px:block text-xl px-2 ${
              active === 9 ? "text-info font-bold" : " "
            }`}
          >
            Hóa đơn
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4 hover:bg-neutral-content">
        <Link to="/admin-withdraw-request" className="w-full flex items-center">
          <CiMoneyBill size={30} />
          <h5
            className={`hidden 800px:block text-xl px-2 ${
              active === 7 ? "text-info font-bold" : " "
            }`}
          >
            Yêu cầu rút tiền
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4 hover:bg-neutral-content">
        <Link to="/profile" className="w-full flex items-center">
          <AiOutlineSetting size={30} />
          <h5
            className={`hidden 800px:block text-xl px-2 ${
              active === 8 ? "text-info font-bold" : " "
            }`}
          >
            Sửa thông tin
          </h5>
        </Link>
      </div>
    </div>
  );
};

export default AdminSideBar;
