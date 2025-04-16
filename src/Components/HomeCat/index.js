import React from "react";
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const HomeCat = (props) => {


    // const [itemBg, setItemBg] = useState([
    //     '#fffceb',
    //     '#ecffec',
    //     '#feefea',
    //     '#fff3eb',
    //     '#fff3ff',
    //     '#f2fce4',
    //     '#feefea',
    //     '#fffceb',
    //     '#feefea',
    //     '#ecffec',
    //     '#feefea',
    //     '#fff3eb',
    //     '#fff3ff',
    //     '#f2fce4',
    //     '#feefea',

    // ]);


    return (
        <section className="homeCat">
            <div className="container">
                <h3 className="hd">Featured Categories</h3>
                <Swiper
                    slidesPerView={10}
                    spaceBetween={100}
                    navigation={true}
                    slidesPerGroup={3}
                    pagination={{
                        clickable: true,

                    }}
                    modules={[Navigation]}
                    className="mySwiper"
                >

                    {
                        props.catData?.length !== 0 && props.catData?.map((item, index) => {
                            return (
                                <SwiperSlide key={index} >
                                    <div className="item text-center cursor card" style={{ background: item.color }}>
                                        <img src={item.images[0]} alt="" />
                                        <h6>{item.name}</h6>
                                    </div>
                                </SwiperSlide>
                            )
                        })
                    }

                </Swiper>
            </div>
        </section>
    )
}

export default HomeCat;