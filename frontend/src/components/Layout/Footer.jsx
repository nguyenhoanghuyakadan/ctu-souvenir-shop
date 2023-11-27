import React from "react";
import { FaFacebook } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer footer-center p-10 border">
      <aside>
        <img
          src="https://i.imgur.com/l6FOdE6.png"
          className="w-24 h-24 object-cover"
        />
        <p className="font-bold">
          Can Tho University. <br />
          CTU Souvenir Shop
        </p>
        <p>
          Địa chỉ: Khu II, Đ. 3 Tháng 2, Xuân Khánh, Ninh Kiều, Cần Thơ - Điện
          thoại liên hệ: +84292 3832 663 - Email: dhct@ctu.edu.vn
        </p>
      </aside>
      <nav>
        <div className="grid grid-flow-col gap-4">
          <Link to={"https://www.facebook.com/CTUDHCT"}>
            <FaFacebook color="#3B5998" size={36} />
          </Link>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
