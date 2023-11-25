import React from "react";
import Slider from "react-slick";
import { useSelector } from "react-redux";
import { backend_url } from "../../../server";

const Banner = () => {
  const { isLoading, allBanners } = useSelector((state) => state.banners);
  console.log(allBanners);
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };
  return (
    <div className="mx-24">
      <Slider {...settings}>
        {allBanners?.map((i) => (
          <div className="rounded">
            <div>
              <img
                src={`${backend_url}${i.image}`}
                alt={i.name}
                className="max-w-full	max-h-full object-cover rounded"
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
