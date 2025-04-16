import React from "react";
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ProductItem from "../../ProductItem";

const RelatedProducts = (props) => {
  return (
    <>
      <div className="col-md-12 productRow">
        <div className="d-flex align-items-center mt-3">
          <div className="info w-75">
            <h3 className="mb-0 hd">{props.title}</h3>

          </div>

        </div>


        <div className="product_row w-100 mt-3 gap-5">
          <Swiper 
            slidesPerView={6}
            spaceBetween={0}
            navigation={true}
            slidesPerGroup={3}
            pagination={{
              clickable: true,

            }}
            modules={[Navigation]}
            className="mySwiper1"
          >

            {
              props?.data?.length !== 0 && props?.data?.map((item, index) => {
                return (
                   
                  <SwiperSlide key={index}>
                      <ProductItem item={item} itemView={props.itemView} />
                  </SwiperSlide>
                    
                )
              })
            }
           

          </Swiper>
        </div>
      </div>
    </>
  )
}

export default RelatedProducts;