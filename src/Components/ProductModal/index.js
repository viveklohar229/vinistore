import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Rating from '@mui/material/Rating';
import { useContext, useEffect, useState } from 'react';

import { IoClose } from "react-icons/io5";
import { MdOutlineCompareArrows } from "react-icons/md";
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import { MyContext } from '../../App';
import { fetchDataFromApi, postData } from '../../utils/api';
import ProductZoom from '../ProductZoom';

import { IoIosHeartEmpty } from 'react-icons/io';
import { GoHeartFill } from 'react-icons/go';


const ProductModal = (props) => {
    const context = useContext(MyContext);
    const [isAddedToMyList, setIsAddedToMyList] = useState(false);



    const addToMyList = (id) => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user !== undefined && user !== null && user !== "") {
            const data = {
                productTitle: props.data?.name,
                images: props.data?.images[0],
                rating: props.data?.rating,
                price: props.data?.price,
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

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        fetchDataFromApi(`/api/myList?productId=${props.data?.id}&userId=${user?.userId}`).then((res) => {
            if (res.length !== 0) {
                setIsAddedToMyList(true)
            }
        })
    }, []);



    return (
        <>
            <Dialog open={true} className='productModal' onClose={() => context.setisOpenProductModal(false)}>
                <Button className="close_" onClick={() => context.setisOpenProductModal(false)}><IoClose></IoClose></Button>
                <h4 className='mb-1 '>{props.data?.name}</h4>
                <div className='d-flex align-items-center'>
                    <div className="d-flex align-items-center BoxDetail">
                        <span>Brands:</span>
                        <span className='brandName'> <b>{props.data?.brand}</b> </span>
                    </div>
                    <Rating className="rating" name="read-only" value={parseInt(props?.data?.rating)} readOnly size="small" precision={0.5} />
                </div>
                <hr />

                <div className="row productDetailModal">
                    <div className="col-md-5">
                        <ProductZoom images={props.data?.images} discount={props.data?.discount} />

                    </div>


                    <div className="col-md-7">
                        <div className="d-flex info align-items-center mb-3">
                            <div className="oldPrice text-light lg">Rs: {props.data?.oldPrice}</div>
                            <div className="netPrice text-danger lg">Rs: {props.data?.price}</div>
                        </div>

                        <span className='badge bg-success '>IN STOCK</span>
                        <p className='mt-3'>{props.data?.description}</p>

                        {/* <div className="d-flex align-items-center">
                            <QuantityBox/>
                            <Button className='btn-blue btn-lg btn-big btn-round m-lg-3'>Add to Cart</Button>
                        </div> */}


                        <div className="d-flex align-items-center mt-4 actions">
                            <Button onClick={() => addToMyList(props.data?.id)} className='btn-round btn-sml' variant="outlined">
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
                            <Button className='btn-round btn-sml m-lg-3' variant="outlined"><MdOutlineCompareArrows /> &nbsp; COMPARE</Button>
                        </div>
                    </div>

                </div>

            </Dialog>
        </>
    )
}

export default ProductModal;