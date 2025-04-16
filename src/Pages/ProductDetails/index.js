import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import { useContext, useEffect, useState } from 'react';
import { FaCartPlus } from "react-icons/fa6";
import { GoHeartFill } from 'react-icons/go';
import { IoIosHeartEmpty } from 'react-icons/io';
import { MdOutlineCompareArrows } from "react-icons/md";
import { useParams } from 'react-router-dom';
import { MyContext } from "../../App";
import Description from '../../Components/Description';
import RelatedProducts from '../../Components/Description/RelatedProducts';
import ProductZoom from '../../Components/ProductZoom';
import QuantityBox from '../../Components/QuantityBox';
import { fetchDataFromApi, postData } from '../../utils/api';

const ProductDetails = () => {
    const context = useContext(MyContext);
    const [activeSize, setActiveSize] = useState(null);
    // const [activeTab, setActiveTab] = useState(0);
    const [productData, setProductData] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [relatedProductData, setRelatedProductData] = useState([]);
    const [recentlyViewedProductData, setRecentlyViewedProductData] = useState([]);
    const [reviewData, setReviewData] = useState([]);
    let [cartFields, setCartFields] = useState({});
    const [tabError, setTabError] = useState(false);
    const [productQauntity, setProductQauntity] = useState();
    const [isAddedToMyList, setIsAddedToMyList] = useState(false);


    const isActive = (index) => {
        setActiveSize(index);
        setTabError(false);
    }

    const { id } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
        setActiveSize(null);
        fetchDataFromApi(`/api/products/${id}`).then((res) => {
            setProductData(res);

            if (productData?.productRams === undefined && productData?.productWeight === undefined && productData?.productSize === undefined) {
                setActiveSize(1);
            }


            fetchDataFromApi(`/api/products?subCatId=${res?.subCatId}`).then((res) => {
                const filterData = res?.products?.filter(item => item.id !== id);
                setRelatedProductData(filterData);
            })

            fetchDataFromApi(`/api/recentlyViewed`).then((recentlyViewed) => {
                setRecentlyViewedProductData(recentlyViewed); // State update

                // ✅ Agar product list me nahi hai to hi post karo
                if (!recentlyViewed.some(item => item.prodId === res.id)) {
                    postData(`/api/recentlyViewed`, res);
                }
            });

            fetchDataFromApi(`/api/productReviews?productId=${id}`).then((res)=>{
                setReviewData(res);
            })

            const user = JSON.parse(localStorage.getItem("user"))
            fetchDataFromApi(`/api/myList?productId=${id}&userId=${user?.userId}`).then((res) => {
                if (res.length !== 0) {
                    setIsAddedToMyList(true)
                }
            })

            
        });


    }, [id]);

    const quantity = (val) => {
        setProductQauntity(val)
    }


    const addtoCart = (productData) => {

        if (activeSize !== null) {
            const user = JSON.parse(localStorage.getItem("user"));
            cartFields.productTitle = productData?.name
            cartFields.images = productData?.images[0]
            cartFields.rating = productData?.rating
            cartFields.price = productData?.price
            cartFields.quantity = productQauntity
            cartFields.subTotal = parseInt(productData?.price * productQauntity)
            cartFields.productId = productData?.id
            cartFields.userId = user?.userId

            context.addToCart(cartFields)
            setTimeout(() => {
                setIsLoading(true);
                window.location.href = `/product/${id}`
            }, 1000)
        } else {
            setTabError(true);

        }

    }



    const addToMyList = (id) => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user !== undefined && user !== null && user !== "") {
            const data = {
                productTitle: productData?.name,
                images: productData?.images[0],
                rating: productData?.rating,
                price: productData?.price,
                productId: id,
                userId: user?.userId
            }
            postData(`/api/myList/add`, data).then((res) => {

                if (res.status && res.status !== false) {
                    context.setalertBox({
                        open: true,
                        error: false,
                        msg: res.msg || "The product added in my list!"
                    });
                    fetchDataFromApi(`/api/myList?productId=${id}&userId=${user?.userId}`).then((res) => {
                        if (res.length !== 0) {
                            setIsAddedToMyList(true)
                        }
                    })
                } else {
                    context.setalertBox({
                        open: true,
                        error: true,
                        msg: res.msg || "Product already added in the my list"
                    });
                }

            })
        } else {
            context.setalertBox({
                open: true,
                error: true,
                msg: "Please Login to continue !"
            });
        }



    }

    return (
        <>
            <section className="productDetails section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 pl-5">
                            <ProductZoom images={productData?.images} discount={productData?.discount} />
                        </div>

                        <div className="col-md-7 pl-5 pr-3">
                            <h2 className="hd text-Capitalize">{productData?.name}</h2>

                            <ul className="list list-inline  d-flex align-items-center">
                                <li className="list-inline-item">
                                    <div className="d-flex align-items-center">
                                        <span className="text-light mr-2 brandName">Brand: </span>
                                        <span>{productData?.brand}</span>
                                    </div>
                                </li>
                                <li className="list-inline-item">
                                    <div className="d-flex align-items-center">
                                        <Rating className="rating" name="read-only" value={parseInt(productData?.rating)} readOnly size="small" precision={0.5} />

                                        <span className='text-light cursor ml-3'>
                                            {reviewData?.length} Review</span>
                                    </div>
                                </li>

                                <li className="list-inline-item">
                                    <div className="d-flex align-items-center">
                                        <span className="text-light mr-2 brandName">Category:</span>
                                        <span>{productData?.catName}</span>
                                    </div>
                                </li>
                            </ul>

                            <div className="d-flex info mb-3">
                                <span className='oldPrice'>Rs: {productData?.oldPrice}</span>
                                <span className='netPrice text-danger ml-2'>Rs: {productData?.price}</span>
                            </div>
                            <span className='badge bg-success '>IN STOCK</span>
                            <p className='mt-3'> {productData?.description}</p>

                            {
                                productData?.productRams?.length !== 0 &&
                                <div className=" productSize d-flex align-items-center">
                                    <span>RAMS  :</span>
                                    <ul className={`list list-inline mb-0 pl-2 ${tabError === true && 'error'}`}>
                                        {productData?.productRams?.map((item, index) => {
                                            return (
                                                <li className='list-inline-item'>
                                                    <a href className={`tag ${activeSize === index ? 'active' : ''}`} onClick={() => isActive(index)}>{item}</a>
                                                </li>
                                            )
                                        })
                                        }
                                    </ul>
                                </div>
                            }
                            {
                                productData?.productSize?.length !== 0 &&
                                <div className=" productSize d-flex align-items-center">
                                    <span>SIZE  :</span>
                                    <ul className={`list list-inline mb-0 pl-2 ${tabError === true && 'error'}`}>
                                        {productData?.productSize?.map((item, index) => {
                                            return (
                                                <li className='list-inline-item'>
                                                    <a href className={`tag ${activeSize === index ? 'active' : ''}`} onClick={() => isActive(index)}>{item}</a>
                                                </li>
                                            )
                                        })
                                        }
                                    </ul>
                                </div>
                            }
                            {
                                productData?.productWeight?.length !== 0 &&
                                <div className=" productSize d-flex align-items-center">
                                    <span>WEIGHT  :</span>
                                    <ul className={`list list-inline mb-0 pl-2 ${tabError === true && 'error'}`}>
                                        {productData?.productWeight?.map((item, index) => {
                                            return (
                                                <li className='list-inline-item'>
                                                    <a href className={`tag ${activeSize === index ? 'active' : ''}`} onClick={() => isActive(index)}>{item}</a>
                                                </li>
                                            )
                                        })
                                        }
                                    </ul>
                                </div>
                            }

                            <div className="d-flex align-items-center mt-2">
                                <QuantityBox quantity={quantity} />
                                <Button className='btn-blue btn-lg btn-big btn-round m-lg-3' onClick={() => addtoCart(productData)}> <FaCartPlus /> &nbsp;
                                    {
                                        context.addingInCart === true ? "Adding..." : "Add to Cart"
                                    }
                                </Button>
                            </div>


                            <div className="d-flex align-items-center mt-2 actions">
                                <Button onClick={() => addToMyList(id)} className='btn-round btn-circle btn-sml' variant="outlined">
                                    {
                                        isAddedToMyList === true ?
                                            <>
                                                <GoHeartFill className='text-danger' style={{ fontSize: "20px" }} />
                                                &nbsp; ADDED TO WISHLIST
                                            </>
                                            :
                                            <>
                                                <IoIosHeartEmpty style={{ fontSize: "20px" }} />
                                                &nbsp; ADD TO WISHLIST
                                            </>

                                    }

                                </Button>
                                <Button className='btn-round btn-sml m-lg-3' variant="outlined"><MdOutlineCompareArrows />&nbsp; COMPARE</Button>
                            </div>


                        </div>


                    </div>

                    <Description description={productData?.description} />
                    {
                        relatedProductData?.length !== 0 && <RelatedProducts title="RELATED PRODUCTS" data={relatedProductData} />
                    }
                    {/* <RelatedProducts title="RELATED PRODUCTS" ></RelatedProducts > */}
                    {
                        recentlyViewedProductData?.length !== 0 && <RelatedProducts title="RECENTLY VIEWED PRODUCTS" itemView={"recentlyView"} data={recentlyViewedProductData} />
                    }

                </div>
            </section>

            {
                isLoading === true && <div className="loading"></div>
            }
        </>
    )
}

export default ProductDetails;
