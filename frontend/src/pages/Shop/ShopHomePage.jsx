import React from "react";
import ShopInfo from "../../components/Shop/ShopInfo";
import ShopProfileData from "../../components/Shop/ShopProfileData";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";

const ShopHomePage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="py-4 mx-24">
        <div className="w-full flex justify-between">
          <div className="w-[25%] bg-[#fff] rounded-[4px] shadow-sm overflow-y-scroll h-[90vh] sticky top-10 left-0 z-10">
            <ShopInfo isOwner={true} />
          </div>
          <div className="w-[72%] rounded-[4px]">
            <ShopProfileData isOwner={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopHomePage;
