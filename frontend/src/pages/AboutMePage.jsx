import React from "react";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";

const AboutMePage = () => {
  return (
    <div>
      <Header activeHeading={5} />
      <AboutMe />
      <Footer />
    </div>
  );
};

const AboutMe = () => {
  return (
    <div className="mx-24 my-4">
      <h1 className="text-3xl font-bold mb-4">
        Giới thiệu về Trường Đại học Cần Thơ
      </h1>

      <div className="mb-8">
        <p className="mb-4">
          Trường Đại học Cần Thơ được thành lập vào ngày 31/3/1966, là một
          trường đại học đa ngành, đa lĩnh vực tại khu vực Đồng bằng sông Cửu
          Long.
        </p>

        <p className="mb-4">
          Trụ sở chính của nhà trường tọa lạc tại phường Xuân Khánh, quận Ninh
          Kiều, thành phố Cần Thơ.
        </p>
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-4">Cơ cấu tổ chức</h3>

        <p className="mb-2">
          Cơ cấu tổ chức của Trường Đại học Cần Thơ gồm có 3 Viện, 9 Khoa, 1
          Phân hiệu ĐHCT tại Sóc Trăng và 22 Bộ môn trực thuộc các Khoa.
        </p>
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-4">Ngành đào tạo</h3>

        <p className="mb-2">
          Các đơn vị này đảm nhiệm đào tạo hơn 50 ngành nghề, chủ yếu thuộc các
          lĩnh vực: Khoa học Tự nhiên, Kỹ thuật - Công nghệ, Kinh tế & Quản trị
          kinh doanh, Nông nghiệp, Xã hội nhân văn, Y Dược...
        </p>
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-4">Đội ngũ giảng viên</h3>

        <p className="mb-2">
          Nhà trường có đội ngũ giảng viên giỏi, tâm huyết với nghề. Hiện tại số
          lượng giảng viên cơ hữu là 981 người.
        </p>
      </div>
    </div>
  );
};

export default AboutMePage;
