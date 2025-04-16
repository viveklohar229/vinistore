import { Rating } from '@mui/material';
import Button from '@mui/material/Button';
import { useContext, useEffect, useState } from 'react';
import { IoClose } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { MyContext } from '../../App';
// import QuantityBox from '../../Components/QuantityBox';
import { FaHome } from 'react-icons/fa';
import emptyMyList from '../../assets/images/emptyMyList.jpg';
import { deleteData, fetchDataFromApi } from '../../utils/api';
import { useNavigate } from 'react-router-dom';

const MyList = () => {

    const context = useContext(MyContext);
    const [isLogin, setIsLogin] = useState(false);
    const [myListData, setMyListData] = useState([]);
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
        fetchDataFromApi(`/api/myList?userId=${user?.userId}`).then((res) => {
            setMyListData(res);
        })

    }, []);

    const removeItem = (id) => {
        deleteData(`/api/myList/${id}`).then((res) => {
            setIsLoading(true)
            context.setalertBox({
                open: true,
                error: false,
                msg: "Item removed from My List !"
            })
            const user = JSON.parse(localStorage.getItem("user"));
            fetchDataFromApi(`/api/myList?userId=${user?.userId}`).then((res) => {
                setMyListData(res);
                setTimeout(() => {
                    setIsLoading(false);
                    // window.location.href = `/myList`
                }, 1000)
            })
        })
    }


    return (
        <>

            <section className="section cartPage">

                <div className="myListTableWrapper">
                    <div className="container">
                        <h2 className="hd mb-1">My List</h2>
                        <p>There are <b className='text-red'>{myListData?.length}</b> products in your list </p>


                        {
                            myListData?.length !== 0 ?
                                <div className="row">
                                    <div className="col-md-12 pr-5">
                                        <div className="table-responsive myListTable">
                                            <table className="table">

                                                <tr>
                                                    <th width="35%">Product</th>
                                                    <th width="15%">Price</th>
                                                    <th width="10%">Remove</th>
                                                </tr>


                                                <tbody className='tbody'>
                                                    {
                                                        myListData?.length !== 0 && myListData?.map((item, index) => {
                                                            return (
                                                                <tr>
                                                                    <td width="35%">
                                                                        <Link to={`/product/${item?.productId}`}>
                                                                            <div className="d-flex align-items-center CartItemImgWrapper">
                                                                                <div className="imgWrapper">
                                                                                    <img src={item?.images} alt={item?.productTitle} className="w-100" />
                                                                                </div>

                                                                                <div className="info px-3">
                                                                                    <h6>{item?.productTitle}</h6>
                                                                                    <Rating name="half-rating-read" value={item?.rating} precision={0.5} readOnly size="small"></Rating>
                                                                                </div>
                                                                            </div>
                                                                        </Link>
                                                                    </td>
                                                                    <td width="15%">Rs {item?.price}</td>
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
                                </div>

                                :
                                <div className="empty d-flex align-items-center justify-content-center flex-column">
                                    <img src={emptyMyList} width="150" alt="" />
                                    <h3>My List is currently empty</h3>
                                    <br />
                                    <Link to="/"><Button className='btn-blue bg-red btn-lg btn-big btn-round'><FaHome />&nbsp; Continue Shopping</Button></Link>
                                </div>
                        }

                    </div>

                </div>

            </section>
            {
                isLoading === true && <div className="loading"></div>
            }

        </>
    )
}

export default MyList;

