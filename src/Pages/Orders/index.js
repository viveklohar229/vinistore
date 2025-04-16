import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Pagination from '@mui/material/Pagination';
import React, { useContext, useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { MyContext } from "../../App";
import { fetchDataFromApi } from '../../utils/api';


const Orders = () => {
    const context = useContext(MyContext);
    const [orders, setOrders] = useState([]);
    const [product, setProduct] = useState([]);
    const [isOpenModel, setIsOpenModel] = useState(false);
    const [page, setPage] = useState(1);

    useEffect(() => {
        window.scrollTo(0, 0);

        fetchDataFromApi(`/api/orders?page=1&perPage=8`).then((res) => {
            setOrders(res)
        })
    }, [])


    const handleChange = (event, value) => {
        context.setProgress(40)
        setPage(value)
        fetchDataFromApi(`/api/orders?page=${value}$perPage=8`).then((res) => {
            setOrders(res);
            context.setProgress(100)
            window.scrollTo({
                top: 200,
                bahavior: 'smooth'
            })
        })
    }

    const showProducts = (id) => {
        fetchDataFromApi(`/api/orders/${id}`).then((res) => {
            setIsOpenModel(true)
            setProduct(res.products)
        })
    }

    return (
        <>
            <section className='section'>
                <div className="container">
                    <h2 className="hd">Orders</h2>
                    <div className="table-responsive orderTable">
                        <table className='table table-striped table-bordered'>
                            <thead className="thead-dark">
                                <tr>
                                    <th>Payment Id</th>
                                    <th>Products</th>
                                    <th>Name</th>
                                    <th>Phone Number</th>
                                    <th>Address</th>
                                    <th>Pin Code</th>
                                    <th>Total Amount</th>
                                    <th>Email</th>
                                    <th>User Id</th>
                                    <th>Date</th>
                                    <th>Order Status</th>

                                </tr>
                            </thead>
                            <tbody>

                                {
                                    Array.isArray(orders?.ordersList) && orders?.ordersList?.length !== 0 && orders?.ordersList?.map((item, index) => {
                                        return (
                                            <>
                                                <tr key={index}>
                                                    <td><span className='text-blue font-weight-bold'>{item?.paymentId}</span></td>
                                                    <td><span className='text-blue font-weight-bold cursor' onClick={() => showProducts(item?._id)}>Click here to view</span></td>
                                                    <td>{item?.name}</td>
                                                    <td>{item?.phoneNumber}</td>
                                                    <td>{item?.address}</td>
                                                    <td>{item?.pincode}</td>
                                                    <td>{item?.amount}</td>
                                                    <td>{item?.email}</td>
                                                    <td>{item?.userId}</td>
                                                    <td>{item?.date}</td>
                                                    <td>{item?.status === "pending" ? <span className='badge bg-danger '>{item?.status}</span> : <span className='badge bg-success '>{item?.status}</span>}</td>

                                                </tr>
                                            </>
                                        )
                                    })
                                }

                            </tbody>
                        </table>
                    </div>
                    {
                        orders?.ordersList?.totalPages > 1 &&
                        <div className="d-flex tableFooter">
                            <p>showing <b>{page}</b> of <b>{orders?.ordersList?.length}</b> results</p>
                            <Pagination count={orders?.ordersList?.totalPages} color="primary" className="pagination" showFirstButton showLastButton onChange={handleChange} />

                        </div>
                    }
                </div>
            </section>

            <Dialog open={isOpenModel} className='productModal' onClose={() => setIsOpenModel(false)} >
                <Button className="close_" onClick={() => setIsOpenModel(false)}><IoClose /></Button>
                <h4 className='mb-1 '>Products</h4>
                <div className="table-responsive orderTable mt-2">
                    <table className='table table-striped table-bordered'>
                        <thead className="thead-dark">
                            <tr>
                                <th>Product Id</th>
                                <th>Product Title</th>
                                <th>Images</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Sub Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Array.isArray(product) && product?.length !== 0 && product?.map((item, index) => {
                                    return (
                                        <>
                                            <tr key={index}>
                                                <td>{item?.productId}</td>
                                                <td style={{ whiteSpace: "inherit" }}><span>{item?.productTitle?.substr(0, 30) + '...'}</span></td>
                                                <td><div className='img'><img src={item?.images} alt="image" /></div></td>
                                                <td>{item?.quantity}</td>
                                                <td>{item?.price}</td>
                                                <td>{item?.subTotal}</td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </Dialog>
        </>
    )
}

export default Orders;

