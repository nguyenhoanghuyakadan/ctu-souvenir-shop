import React from 'react'
import Header from "../components/Layout/Header";
import Hero from "../components/Route/Hero/Hero";
import Categories from "../components/Route/Categories/Categories";
import BestDeals from "../components/Route/BestDeals/BestDeals";
import FeaturedProduct from "../components/Route/FeaturedProduct/FeaturedProduct";
import Footer from "../components/Layout/Footer";
import Carousel from '../components/Route/Carousel/Carousel';
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector';
const HomePage = () => {

  const {allProducts} = useSelector(state => state.products)
  console.log(allProducts)
  return (
    <div>
        <Header activeHeading={1} />
        <Carousel />
        {/* <Hero /> */}
        <Categories />
        <BestDeals />
        <FeaturedProduct />
        <Footer />
    </div>
  )
}

export default HomePage