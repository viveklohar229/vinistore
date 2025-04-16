import React from "react";
// import Slider from "react-slick";
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const HomeBanner = (props) => {
    return (
        <div className=" homeBannerWrapper container mt-3">
            <div className=" w-100 mt-4 ">
                <Swiper
                    slidesPerView={1}
                    spaceBetween={15}
                    navigation={true}
                    loop={false}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: true,

                    }}
                    modules={[Navigation, Autoplay]}
                    className="myHomeSlider"
                >
                    {
                        props?.data?.length !== 0 && props?.data?.map((item, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    <div className="slide-img-box item" >
                                        <img src={item?.images[0]} alt="" className="slide-img" />
                                    </div>
                                </SwiperSlide>
                            )
                        })
                    }

                </Swiper>
            </div>

        </div>
    )
}

export default HomeBanner;