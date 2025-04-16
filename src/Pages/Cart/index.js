import { Rating } from '@mui/material';
import Button from '@mui/material/Button';
import { useContext, useEffect, useState } from 'react';
import { IoClose } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { MyContext } from '../../App';
import { FaHome } from 'react-icons/fa';
import { IoBagCheckOutline } from "react-icons/io5";
import emptyCart from '../../assets/images/emptyCart1.png';
import { deleteData, fetchDataFromApi } from '../../utils/api';
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom';


const Cart = () => {

    const context = useContext(MyContext);
    const [isLogin, setIsLogin] = useState(false);
    const [cartData, setCartData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const history = useNavigate();

    useEffect(() => {
        window.scrollTo(0,0);
        
        const token = localStorage.getItem("token");
        if(token!==""&& token!==undefined && token!== null){
            setIsLogin(true)
        }
        else{
            history("/signIn")
        }
        const user = JSON.parse(localStorage.getItem("user"));
        fetchDataFromApi(`/api/cart?userId=${user?.userId}`).then((res) => {
            setCartData(res);
        })

    }, []);

    const removeItem = (id) => {
        deleteData(`/api/cart/${id}`).then((res) => {
            setIsLoading(true)
            context.setalertBox({
                open: true,
                error: false,
                msg: "Item removed from cart !"
            })

            const user = JSON.parse(localStorage.getItem("user"));
            fetchDataFromApi(`/api/cart?userId=${user?.userId}`).then((res) => {
                setTimeout(() => {
                    setIsLoading(false);
                    window.location.href = `/cart`
                }, 1000)
                setCartData(res);
            })
        })
    }


    return (
        <>

            <section className="section cartPage">
                <div className="container">
                    <h2 className="hd mb-1">Your Cart</h2>
                    <p>There are <b className='text-red'>{cartData?.length}</b> products in your cart </p>
                    {

                        cartData?.length !== 0 ?

                            <div className="row">
                                <div className="col-md-9 pr-5">
                                    <div className="table-responsive">
                                        <table className="table">

                                            <tr>
                                                <th width="35%">Product</th>
                                                <th width="15%">Unit Price</th>
                                                <th width="25%">Quantity</th>
                                                <th width="15%">Subtotal</th>
                                                <th width="10%">Remove</th>
                                            </tr>


                                            <tbody className='tbody'>
                                                {
                                                    cartData?.length !== 0 && cartData?.map((item, index) => {
                                                        return (
                                                            <tr>
                                                                <td width="35%">
                                                                    <Link to={`/product/${item?.productId}`}>
                                                                        <div className="d-flex align-items-center CartItemImgWrapper">
                                                                            <div className="imgWrapper">
                                                                                <img src={item?.images} alt={item?.productTitle} className="w-100" />
                                                                            </div>

                                                                            <div className="info px-3">
                                                                                <h6>{item?.productTitle.substr(0, 50) + '...'}</h6>
                                                                                <Rating name="half-rating-read" value={item?.rating} precision={0.5} readOnly size="small"></Rating>
                                                                            </div>
                                                                        </div>
                                                                    </Link>
                                                                </td>
                                                                <td width="15%">&#8377;&nbsp; {item?.price}</td>
                                                                <td width="15%" style={{ paddingLeft: "30px" }}> {item?.quantity}</td>
                                                                {/* <td width="25%">

                                                            <QuantityBox quantity={quantity} />
                                                        </td> */}
                                                                <td width="15%">&#8377;&nbsp; {item?.subTotal}</td>
                                                                <td width="10%">
                                                                    <span className='remove' style={{ paddingLeft: "15px" }} onClick={() => removeItem(item?._id)}><IoClose /></span>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>

                                </div>



                                <div className="col-md-3 ">
                                    <div className="card  p-3 cartDetails">
                                        <h4>CART TOTALS</h4>

                                        <div className="d-flex align-items-center mb-3">
                                            <span>Subtotal</span>
                                            <span className='ml-auto text-red font-weight-bold '>&#8377;&nbsp;
                                                {
                                                    cartData.length !== 0 &&
                                                    cartData
                                                        .map(item => parseInt(item.price) * item.quantity)
                                                        .reduce((total, value) => total + value, 0)

                                                }
                                            </span>
                                        </div>
                                        <div className="d-flex align-items-center mb-3">
                                            <span>Shipping</span>
                                            <span className='ml-auto '><b>Free</b></span>
                                        </div>
                                        <div className="d-flex align-items-center mb-3">
                                            <span>Estimate for</span>
                                            <span className='ml-auto '><b>United Kingdom</b></span>
                                        </div>
                                        <div className="d-flex align-items-center mb-3">
                                            <span>Total</span>
                                            <span className='ml-auto text-red font-weight-bold'>
                                                Rs.
                                                {
                                                    cartData.length !== 0 &&
                                                    cartData
                                                        .map(item => parseInt(item.price) * item.quantity)
                                                        .reduce((total, value) => total + value, 0)

                                                }
                                            </span>
                                        </div>
                                        <Link to="/checkout">
                                            <Button className='btn-blue btn-lg btn-big btn-round m-lg-3' style={{ width: "90%" }} > <IoBagCheckOutline />&nbsp; Checkout</Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            :
                            <div className="empty d-flex align-items-center justify-content-center flex-column">
                                <img src={emptyCart} width="150" alt="" />
                                <h3>Your Cart is currently empty</h3>
                                <br />
                                <Link to="/"><Button className='btn-blue bg-red btn-lg btn-big btn-round'><FaHome />&nbsp; Continue Shopping</Button></Link>
                            </div>
                    }
                </div>

            </section>
            {
                isLoading === true && <div className="loading"></div>
            }

        </>
    )
}

export default Cart;



