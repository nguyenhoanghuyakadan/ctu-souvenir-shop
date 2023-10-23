import React from "react";
import { Link } from "react-router-dom";
import { navItems } from "../../static/data";
import styles from "../../styles/styles";

const Navbar = ({ active }) => {
  return (
    <div className={`block 800px:${styles.noramlFlex}`}>
      {navItems &&
        navItems.map((i, index) => (
          <div className="flex">
            <Link
              to={i.url}
              className={`${
                active === index + 1
                  ? "text-black font-bold"
                  : "text-dark-gray 800px:text-dark-gray"
              } pb-[30px] text-lg hover:text-blue 800px:pb-0 px-6 cursor-pointer }`}
            >
              {i.title}
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Navbar;
