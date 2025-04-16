import Slider from "react-slick";
import InnerImageZoom from "react-inner-image-zoom";
import { useRef, useState } from "react";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";

const ProductZoom = (props) => {
    const [slideIndex, setSlideIndex] = useState(0);
    const zoomSliderBig = useRef();
    const zoomSlider = useRef();

    const settings = {
        dots: false,
        infinite: false,
        speed: 700,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: true,
    };

    const settings2 = {
        dots: false,
        infinite: false,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };

    const goto = (index) => {
        setSlideIndex(index);
        zoomSlider.current.slickGoTo(index);
        zoomSliderBig.current.slickGoTo(index);
    };

    return (
        <>
            <div className="productZoom">


              
                <div className="productZoom position-relative">
                    <div className="badge badge-primary ">{parseInt(props?.discount)}%</div>
                    <Slider {...settings2} className="zoomSliderBig" ref={zoomSliderBig}>
                        {props.images?.map((item, index) => (
                            <div className="item" key={index}>
                                <InnerImageZoom zoomType="hover" zoomScale={1} src={item} />
                            </div>
                        ))}
                    </Slider>
                </div>

             
                <div className="smallSlider">
                    <Slider {...settings} className="zoomSlider" ref={zoomSlider}>
                        {props.images?.map((item, index) => (
                            <div className={`item ${slideIndex === index && 'item_active'}`} key={index}>
                                <img src={item} className="w-100" onClick={() => goto(index)} />
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </>
    );
};

export default ProductZoom;