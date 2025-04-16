import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import React, { useContext, useEffect, useState } from 'react';
import { IoBagCheckOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../App';
import { fetchDataFromApi, postData } from '../../utils/api';


const Checkout = () => {
    const context = useContext(MyContext);
    const [cartData, setCartData] = useState([]);
     const [isLogin, setIsLogin] = useState(false);
    // const [totalAmount, setTotalAmount] = useState();
    const [formFields, setFormFields] = useState({
        fullName: "",
        country: "",
        streetAddressLine1: "",
        streetAddressLine2: "",
        city: "",
        state: "",
        zipCode: "",
        phoneNumber: "",
        emailAddress: ""
    })

    // let {id} = useParams();
    const history = useNavigate();


    const onChangeInput = (e) => {
        setFormFields(() => ({
            ...formFields,
            [e.target.name]: e.target.value
        }))
    }

    const checkout = (e) => {
        e.preventDefault();

        // setTotalAmount(cartData.length !== 0 && cartData.map(item => parseInt(item.price) * item.quantity).reduce((total, value) => total + value, 0));

        

        // console.log(formFields);
        if (formFields.fullName === "") {
            context.setalertBox({
                open: true,
                error: true,
                msg: "Please fill full name "
            })
            return false
        }
        if (formFields.country === "") {
            context.setalertBox({
                open: true,
                error: true,
                msg: "Please fill your country "
            })
            return false
        }
        if (formFields.streetAddressLine1 === "") {
            context.setalertBox({
                open: true,
                error: true,
                msg: "Please fill your  street address line 1 "
            })
            return false
        }
        if (formFields.streetAddressLine2 === "") {
            context.setalertBox({
                open: true,
                error: true,
                msg: "Please fill your  street address line 2 "
            })
            return false
        }
        if (formFields.city === "") {
            context.setalertBox({
                open: true,
                error: true,
                msg: "Please fill your city "
            })
            return false
        }
        if (formFields.state === "") {
            context.setalertBox({
                open: true,
                error: true,
                msg: "Please fill your state "
            })
            return false
        }
        if (formFields.zipCode === "") {
            context.setalertBox({
                open: true,
                error: true,
                msg: "Please fill your zip code "
            })
            return false
        }
        if (formFields.phoneNumber === "") {
            context.setalertBox({
                open: true,
                error: true,
                msg: "Please fill phone number "
            })
            return false
        }
        if (formFields.emailAddress === "") {
            context.setalertBox({
                open: true,
                error: true,
                msg: "Please fill email address "
            })
            return false
        }

        const addressInfo = {
            name: formFields.fullName,
            phoneNumber: formFields.phoneNumber,
            address: formFields.streetAddressLine1 + formFields.streetAddressLine2,
            pincode: formFields.zipCode,
            date: new Date().toLocaleDateString(
                "en-US",
                {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                }
            )
        }

        var options = {
            key: process.env.REACT_APP_RAZORPAY_KEY_ID,
            key_secret: process.env.REACT_APP_RAZORPAY_KEY_SECRET,
            amount: parseInt(cartData.length !== 0 && cartData.map(item => parseInt(item.price) * item.quantity).reduce((total, value) => total + value, 0) * 100),
            currency: "INR",
            order_receipt: 'order_rcptid_' + formFields.fullName,
            name: "E-Bharat",
            description: "for testing purpose",
            handler: function (res) {
                const paymentId = res.razorpay_payment_id
                const user = JSON.parse(localStorage.getItem("user"));


                const payLoad = {
                    name: addressInfo.name,
                    phoneNumber: addressInfo.phoneNumber,
                    address: addressInfo.address,
                    pincode: addressInfo.pincode,
                    amount: parseInt(cartData.length !== 0 && cartData.map(item => parseInt(item.price) * item.quantity).reduce((total, value) => total + value, 0) * 100),
                    paymentId: paymentId,
                    email: user?.email,
                    userId: user?.userId,
                    products: cartData,
                    // date: new Date().toLocaleString(
                    //     "en-US",
                    //     {
                    //         month: "short",
                    //         day: "2-digit",
                    //         year: "numeric"
                    //     }
                    // )
                }
                console.log(payLoad);


                postData(`/api/orders/create`, payLoad).then(res => {
                    history('/orders')
                })
            },
            theme: {
                color: "#3399cc"
            }
        };

        var pay = new window.Razorpay(options);
        pay.open();
    }



    useEffect(() => {
        window.scrollTo(0, 0);

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


    return (
        <section className='section'>
            <div className="container">
                <form className='checkoutForm' onSubmit={checkout}>
                    <div className="row">
                        <div className="col-md-8">
                            <h2 className="hd">BILLING DETAILS</h2>
                            <Divider />
                            <div className="row mt-3">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <TextField label="Full Name" variant="outlined" className='w-100' size='small' name="fullName" onChange={onChangeInput} />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <div className="form-group">
                                            <TextField label="Country" variant="outlined" className='w-100' size='small' name="country" onChange={onChangeInput} />
                                        </div>
                            
                                    </div>
                                </div>

                            </div>

                            <h6>Street address *</h6>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <TextField label="House number and street name" variant="outlined" className='w-100' size='small' name="streetAddressLine1" onChange={onChangeInput} />
                                    </div>
                                    <div className="form-group">
                                        <TextField label="Apartment, suite, unit, etc. (optional)" variant="outlined" className='w-100' size='small' name="streetAddressLine2" onChange={onChangeInput} />
                                    </div>
                                </div>
                            </div>


                            <h6>Town/City*</h6>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <TextField label="City" variant="outlined" className='w-100' size='small' name="city" onChange={onChangeInput} />
                                    </div>
                                </div>
                            </div>

                            <h6>State/Country *</h6>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <TextField label="State" variant="outlined" className='w-100' size='small' name="state" onChange={onChangeInput} />
                                    </div>
                                </div>
                            </div>

                            <h6>Postcode/ZIP *</h6>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <TextField label="Pin Code" variant="outlined" className='w-100' size='small' name="zipCode" onChange={onChangeInput} />
                                    </div>
                                </div>
                            </div>


                            <div className="row mt-3">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <TextField label="Phone" variant="outlined" className='w-100' size='small' name="phoneNumber" onChange={onChangeInput} />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <div className="form-group">
                                            <TextField label="Email Address" variant="outlined" className='w-100' size='small' name="emailAddress" onChange={onChangeInput} />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>



                        <div className="col-md-4 mt-5">
                            <div className="card orderInfo ">
                                <h4 className='hd'>YOUR ORDER</h4>
                                <div className="table-responsive">
                                    <table className='table table-borderless'>
                                        <thead>
                                            <tr>
                                                <th>Product</th>
                                                <th>Subtotal</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {
                                                cartData?.length !== 0 && cartData?.map((item, index) => {
                                                    return (
                                                        <tr>
                                                            <td>{item?.productTitle?.substr(0, 30) + '...'} <b>x{item?.quantity}</b> </td>
                                                            <td>&#8377;&nbsp; {item?.subTotal}</td>
                                                        </tr>
                                                    )
                                                })
                                            }

                                        </tbody>
                                        <thead>
                                            <tr>
                                                <th>Total</th>
                                                <th> &#8377;&nbsp;
                                                    {
                                                        cartData.length !== 0 &&
                                                        cartData
                                                            .map(item => parseInt(item.price) * item.quantity)
                                                            .reduce((total, value) => total + value, 0)

                                                    }
                                                </th>
                                            </tr>
                                        </thead>

                                    </table>
                                </div>
                                <Button type='submit' className='btn-blue btn-lg btn-big btn-round m-lg-3'> <IoBagCheckOutline />
                                    &nbsp; Checkout</Button>

                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    )
}
export default Checkout;
