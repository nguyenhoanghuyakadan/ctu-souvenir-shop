import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";
import AllInvoices from "../../components/Shop/AllInvoices";

const ShopAllInvoices = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-center justify-between w-full">
        <div className="w-1/5">
          <DashboardSideBar active={13} />
        </div>
        <div className="w-full justify-center flex">
          <AllInvoices />
        </div>
      </div>
    </div>
  );
};

export default ShopAllInvoices;
