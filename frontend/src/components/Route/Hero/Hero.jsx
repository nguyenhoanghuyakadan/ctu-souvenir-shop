import React from "react";
import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";

const Hero = () => {
  // const { isSeller } = useSelector((state) => state.seller);
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: "url(https://i.imgur.com/hnZELd5.jpg)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">
            Chào mừng bạn đến cửa hàng lưu niệm Đại học Cần Thơ!
          </h1>
          <p className="mb-5">
            Tại đây, chúng tôi tự hào giới thiệu những sản phẩm lưu niệm độc
            đáo, đánh dấu những kỷ niệm tuyệt vời của bạn tại trường. Hãy khám
            phá và chia sẻ niềm tự hào với chúng tôi.
          </p>
          <Link to="/products">
            <button className="btn m-4">Mua ngay</button>
          </Link>
          <Link to="/shop-create">
            <button className="btn m-4">Đăng ký làm người bán</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
