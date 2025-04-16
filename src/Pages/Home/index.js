import Button from '@mui/material/Button';
import React, { useContext, useEffect, useState } from "react";
import { IoArrowForward } from "react-icons/io5";
import { MdMailOutline } from "react-icons/md";
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { MyContext } from '../../App';
import HomeBanner from "../../Components/HomeBanner";
import HomeCat from "../../Components/HomeCat";
import ProductItem from "../../Components/ProductItem";
import banner1 from '../../assets/images/banner1.jpg';
import banner2 from '../../assets/images/banner2.jpg';
import banner3 from '../../assets/images/banner3.jpg';
import banner4 from '../../assets/images/banner4.jpg';
import newLetterImg from '../../assets/images/newLetterImg.webp';
import { fetchDataFromApi } from '../../utils/api';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

const Home = () => {
  const [catData, setCatData] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);
  const [filterData, setFilterData] = useState([]);
  const [homeBanner, setHomeBanner] = useState([]);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const context = useContext(MyContext);

  const selectCat = (item) => {
    if (item) setSelectedCat(item);
  }


  useEffect(() => {
    if (selectedCat !== undefined) {
      const location = localStorage.getItem("location");

      let url = `/api/products?catName=${selectedCat}`;

      if (location && location !== "All") {
        url += `&location=${location}`;
      }

      fetchDataFromApi(url).then((res) => {
        setFilterData(res.products);
      });
    }
  }, [selectedCat, localStorage.getItem("location")]);


  useEffect(() => {
    window.scrollTo(0, 0);

    if (context.categoryData && context.categoryData.length > 0) {
      setSelectedCat(context.categoryData[0].name);
    }

    const location = localStorage.getItem("location");
    if (location !== "" && location !== null && location !== undefined) {
      fetchDataFromApi(`/api/category?location=${location}`).then((res) => {
        setCatData(res);
      });

      fetchDataFromApi(`/api/products/featured?location=${location}`).then((res) => {
        setFeaturedProducts(res);
      });

      fetchDataFromApi(`/api/products?page=1&perPage=8&location=${location}`).then((res) => {
        setProductsData(res);
      });
    } else {

    }

    fetchDataFromApi("/api/homeBanner").then((res) => {
      setHomeBanner(res);
    });

  }, [context.categoryData]);






  return (
    <>
      {
        homeBanner?.length !== 0 && <HomeBanner data={homeBanner} />
      }

      {
        // catData?.length !== 0 && <HomeCat catData={catData} />
        context.categoryData?.length !== 0 && <HomeCat catData={context.categoryData} />
      }



      <section className="homeProducts">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="sticky">
                <div className="banner ">
                  <img src={banner1} alt="" className="sideImg w-100" />
                </div>
                <div className="banner ">
                  <img src={banner2} alt="" className="sideImg w-100 mt-5" />
                </div>
              </div>
            </div>


            <div className="col-md-9 productRow">
              <div className="d-flex align-items-center ">
                <div className="info w-75">
                  <h3 className="mb-0 hd">POPULAR PRODUCTS</h3>
                  <p className="text-light text-sml mb-0">Do not miss the offers until the end of March.</p>
                </div>
                <div className="tabsSlider">
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    className='filterTabs'
                  >
                    {
                      context.categoryData?.map((item, index) => {
                        return (
                          <Tab className='item' label={item.name} onClick={() => selectCat(item.name)} />
                        )
                      })
                    }
                  </Tabs>
                </div>
              </div>


              <div className="product_row w-100 mt-4">
                <Swiper
                  slidesPerView={4}
                  spaceBetween={20}
                  navigation={true}
                  slidesPerGroup={3}
                  pagination={{
                    clickable: true,
                  }}
                  modules={[Navigation]}
                  className="mySwiper"
                >


                  {
                    Array.isArray(filterData) && filterData.length !== 0 &&
                    [...filterData].reverse().map((item, index) => (
                      <SwiperSlide key={index}>
                        <ProductItem item={item} />
                      </SwiperSlide>
                    ))
                  }


                </Swiper>
              </div>


              <div className="d-flex mt-4 mb-5 bannerSec">
                <div className="banner ">
                  <img src={banner3} alt="" className=" w-100 " />
                </div>
                <div className="banner ">
                  <img src={banner4} alt="" className=" w-100 " />
                </div>
              </div>

              <div className="d-flex align-items-center p ">
                <div className="info w-75">
                  <h3 className="mb-0 hd">NEW PRODUCTS</h3>
                  <p className="text-light text-sml mb-0">New products with updated stocks.</p>
                </div>
                <div className="viewAll">
                  <Button className="viewAllBtn ">View All <IoArrowForward></IoArrowForward></Button>
                </div>

              </div>


              <div className="product_row productRow2 w-100 mt-4 d-flex">
                {
                  Array.isArray(productsData?.products) && productsData?.products?.length > 0 &&
                  productsData?.products?.map((item, index) => (
                    <ProductItem key={index} item={item} />
                  ))
                }
              
              </div>

              <div className="d-flex align-items-center mt-5">
                <div className="info w-75">
                  <h3 className="mb-0 hd">FEATURED PRODUCT</h3>
                  <p className="text-light text-sml mb-0">Do not miss the offers until the end of March.</p>
                </div>
              </div>


              <div className="product_row w-100 mt-4">
                <Swiper
                  slidesPerView={4}
                  spaceBetween={20}
                  navigation={true}
                  slidesPerGroup={3}
                  pagination={{
                    clickable: true,
                  }}
                  modules={[Navigation]}
                  className="mySwiper"
                >
                  {
                    Array.isArray(featuredProducts) && featuredProducts.length > 0 &&
                    featuredProducts.map((item, index) => (
                      <SwiperSlide key={index}>
                        <ProductItem item={item} />
                      </SwiperSlide>
                    ))
                  }

                </Swiper>
              </div>
            </div>
          </div>
        </div>

      </section>


      <section className="newLetterSection mt-3  d-flex align-items-center">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <p className="text-white mb-1">$20 discount for your first order</p>
              <h3 className="text-white">Join our newsletter and get...</h3>
              <p className="text-light">Join our email subscription now to get updates<br></br> on promotion and coupons.</p>


              <form>
                <MdMailOutline></MdMailOutline>
                <input type="text" placeholder='Your Email Address' />
                <button>Subscribe</button>
              </form>
            </div>
            <div className="col-md-6">
              <img src={newLetterImg} alt="" />
            </div>
          </div>
        </div>
      </section>




    </>
  )
}

export default Home