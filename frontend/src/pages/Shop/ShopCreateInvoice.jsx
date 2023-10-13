import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";
import CreateInvoice from "../../components/Shop/CreateInvoice";

const ShopCreateInvoice = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-center justify-between w-full">
        <div className="w-1/5">
          <DashboardSideBar active={4} />
        </div>
        <div className="w-full justify-center flex">
          <CreateInvoice />
        </div>
      </div>
    </div>
  );
};

export default ShopCreateInvoice;
