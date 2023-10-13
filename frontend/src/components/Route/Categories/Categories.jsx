import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { categoriesData } from "../../../static/data";

const Categories = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="m-4">
        <h1 className="font-bold text-4xl text-center">Danh mục sản phẩm</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {categoriesData.map((c) => (
          <Link to={`/products?category=${c.title}`}>
            <div
              key={c.id}
              className="hero"
              style={{
                backgroundImage: `url(${c.image_Url})`,
              }}
            >
              <div className="hero-overlay bg-opacity-60"></div>
              <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                  <h1 className="mb-5 text-5xl font-bold">{c.title}</h1>
                  {/* <p className="mb-5">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut
                assumenda excepturi exercitationem quasi. In deleniti eaque
                aut repudiandae et a id nisi.
              </p> */}
                  {/* <button className="btn btn-primary">Get Started</button> */}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
