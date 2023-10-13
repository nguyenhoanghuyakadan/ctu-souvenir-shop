import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import styles from "../styles/styles";

import { categoriesData} from"../static/data";
import { BiMenuAltLeft } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import DropDown from "../components/Layout/DropDown";

import Lottie from "react-lottie";
import animationData from "../Assests/animations/searchNotFound.json";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const {allProducts,isLoading} = useSelector((state) => state.products);
  const [data, setData] = useState([]);

  const [dropDown, setDropDown] = useState(false);

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    if (categoryData === null) {
      const d = allProducts;
      setData(d);
    } else {
      const d =
      allProducts && allProducts.filter((i) => i.category === categoryData);
      setData(d);
    }
    //    window.scrollTo(0,0);
  }, [allProducts]);

  return (
  <>
  {
    isLoading ? (
      <Loader />
    ) : (
      <div>
      <Header activeHeading={3} />
      <br />
      <br />
      <div className="flex justify-end">
        <div className="mr-[3vw]">
       <div onClick={() => setDropDown(!dropDown)}>
            <div className="relative h-[60px] mt-[10px] w-[370px] mb-7 hidden 1000px:block">
              <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
              <button
                className={`h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md`}
              >
                Danh mục
              </button>
            
              <IoIosArrowDown
                size={20}
                className="absolute right-2 top-4 cursor-pointer"
                onClick={() => setDropDown(!dropDown)}
              />
              {dropDown ? (
               <> 
               <DropDown
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                /></>
                
              ) : null}
            </div>
          </div> 
          </div>
      </div>
      <div className={`${styles.section}`}>
      
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
          {data && data.map((i, index) => <ProductCard data={i} key={index} />)}
        </div>
        {data && data.length === 0 ? (
           <div>
           <Lottie options={defaultOptions} width={300} height={300} />
           <h5 className="text-center mb-14 text-[25px] text-[#000000a1]">
             Không tìm thấy sản phẩm 🥲
           </h5>
           <br />
           <br />
         </div>
        ) : null}
      </div>
      <Footer />
    </div>
    )
  }
  </>
  );
};

export default ProductsPage;
