import { CircularProgress, Rating } from '@mui/material';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDataFromApi, postData } from '../../utils/api';

const Description = (props) => {


    const [activeTabs, setActiveTabs] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [reviewData, setReviewData] = useState([]);
    const [rating, setRating] = useState(1);
    const [reviews, setReviews] = useState({
        productId: "",
        customerName: "",
        customerId: "",
        review: "",
        customerRating: 0
    });

    const onChangeInput = (e) => {
        setReviews(() => ({
            ...reviews,
            [e.target.name]: e.target.value
        }))
    }

    const onChangeRating = (e) => {
        setRating(e.target.value)
        reviews.customerRating = e.target.value;

    }
    const { id } = useParams();

    useEffect(() => {
        fetchDataFromApi(`/api/productReviews?productId=${id}`).then((res) => {
            setReviewData(res);
        });
    }, [id]);


    const addReview = (e) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem("user"));
        reviews.customerId = user?.userId;
        reviews.customerName = user?.name;
        reviews.productId = id
        
        setIsLoading(true);
        
        postData("/api/productReviews/add", reviews).then((res) => {
            setTimeout(() => {
                setIsLoading(false);
            }, 1000)
            
            reviews.customerRating = 1;

            setReviews({
                review: "",
                customerRating: 1
            })

            fetchDataFromApi(`/api/productReviews?productId=${id}`).then((res) => {
                setReviewData(res)
            })
        })

    }

    return (
        <>
            <div className="card mt-5 p-5 detailsTabs">
                <div className="customTabs">
                    <ul className="list list-inline">
                        <li className="list-inline-item">
                            <Button className={`${activeTabs === 0 && 'active'}`} onClick={() => {
                                setActiveTabs(0)
                            }}>Description</Button>
                        </li>
                        <li className="list-inline-item">
                            <Button className={`${activeTabs === 1 && 'active'}`} onClick={() => {
                                setActiveTabs(1)
                            }}>Additional Information</Button>
                        </li>
                        <li className="list-inline-item">
                            <Button className={`${activeTabs === 2 && 'active'}`} onClick={() => {
                                setActiveTabs(2)
                            }}>Reviews</Button>
                        </li>
                    </ul>

                    <br />

                    {
                        activeTabs === 0 &&
                        <div className="tabContent">
                            {/* <p>{currentProduct.description}</p> */}
                            <p>{props.description}</p>
                        </div>
                    }
                    {
                        activeTabs === 1 &&
                        <div className="tabContent">
                            <div className="table-responsive">
                                <table className='table table-bordered'>
                                    <tbody>
                                        <tr className='stand-up'>
                                            <th>Stand Up</th>
                                            <td>
                                                <p>front to wheel back</p>
                                            </td>
                                        </tr>
                                        <tr className="folded-wo-wheels">
                                            <th>Folded</th>
                                            <td>
                                                <p>32.5"L</p>
                                            </td>
                                        </tr>
                                        <tr className='folded-w-wheels'>
                                            <th>Folded </th>
                                            <td>
                                                <p>32.5"l</p>
                                            </td>
                                        </tr>
                                        <tr className='door-pass-through'>
                                            <th>Door Pass Through</th>
                                            <td>
                                                <p>24</p>
                                            </td>
                                        </tr>
                                        <tr className='frame'>
                                            <th>Frame</th>
                                            <td>
                                                <p>Aluminum</p>
                                            </td>
                                        </tr>
                                        <tr className='weight-wo-wheels'>
                                            <th>Weight (w/o wheels) </th>
                                            <td>
                                                <p>20 LBS</p>
                                            </td>
                                        </tr>
                                        <tr className='weight-capacity'>
                                            <th>Wight Capacity</th>
                                            <td>
                                                <p>60 LBS</p>
                                            </td>
                                        </tr>
                                        <tr className='width'>
                                            <th>Width</th>
                                            <td>
                                                <p>24"</p>
                                            </td>
                                        </tr>
                                        <tr className='handle-height-ground-to-handle'>
                                            <th>handle height (ground to handle) </th>
                                            <td>
                                                <p>37-45"</p>
                                            </td>
                                        </tr>
                                        <tr className='wheels'>
                                            <th>Wheels</th>
                                            <td>
                                                <td>
                                                    <p>12" air / wide track slick tread</p>
                                                </td>
                                            </td>
                                        </tr>
                                        <tr className='seat-back-height'>
                                            <th>seat back height</th>
                                            <td>
                                                <p>25"</p>
                                            </td>
                                        </tr>
                                        <tr className='head-room-inside-canopy'>
                                            <th>head room (inside canopy) </th>
                                            <td>
                                                <p>25"</p>
                                            </td>
                                        </tr>
                                        <tr className='pa_color'>
                                            <th>Color</th>
                                            <td>
                                                <p>Black, Blue, Red, White</p>
                                            </td>
                                        </tr>
                                        <tr className='pa_size'>
                                            <th>Size</th>
                                            <td>
                                                <p>M, S</p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    }

                    {
                        activeTabs === 2 &&
                        <div className="tabContent">
                            <div className="row">
                                <div className="col-md-8">
                                    <h3>Customer question & Answer</h3>
                                    <br />
                                    {
                                        Array.isArray(reviewData) && reviewData.length > 0 && reviewData?.slice(0)?.reverse()?.map((item, index) => {
                                            return (
                                                <div className="card p-4 reviewsCard flex-row shadow" key={index}>
                                                    <div className="info pl-5">
                                                        <div className="d-flex align-items-center w-100">
                                                            <h5>{item?.customerName}</h5></div>
                                                        <div className="d-flex align-items-center w-100">
                                                            <h6 className='text-light'>{new Date(item?.dataCreated).toDateString()}</h6>
                                                        </div>
                                                        <div className="ml-auto">
                                                            <Rating name="half-rating-read" value={item?.customerRating} readOnly size="small">
                                                            </Rating>
                                                        </div>

                                                    </div>

                                                    <p>{item?.review}</p>

                                                </div>
                                            )
                                        })
                                    }



                                </div>

                                <div className="col-md-4  reviewBox">
                                    <h4>Customer Reviews</h4>
                                    <div className="d-flex align-items-center mt-2">
                                        <Rating name='half-rating-read' defaultValue={4.5} precision={0.5} readOnly size="small">
                                        </Rating>
                                        <span className='ml-3'>4.8 out of 5</span>
                                    </div>

                                    <div className="progressBarBox d-flex align-items-center">
                                        <span className='mr-3'>5 star</span>
                                        <div className='progress' style={{ width: '78%', height: '20px' }}>
                                            <div style={{ width: "75%", height: "20px" }} className="progress-bar bg-success" >75%</div>
                                        </div>

                                    </div>
                                    <div className="progressBarBox d-flex align-items-center">
                                        <span className='mr-3'>4 star</span>
                                        <div className='progress' style={{ width: '78%', height: '20px' }}>
                                            <div style={{ width: "50%", height: "20px" }} className="progress-bar bg-success" >50%</div>
                                        </div>

                                    </div>
                                    <div className="progressBarBox d-flex align-items-center">
                                        <span className='mr-3'>3 star</span>
                                        <div className='progress' style={{ width: '78%', height: '20px' }}>
                                            <div style={{ width: "55%", height: "20px" }} className="progress-bar bg-success" >55%</div>
                                        </div>

                                    </div>
                                    <div className="progressBarBox d-flex align-items-center">
                                        <span className='mr-3'>2 star</span>
                                        <div className='progress' style={{ width: '78%', height: '20px' }}>
                                            <div style={{ width: "35%", height: "20px" }} className="progress-bar bg-success" >35%</div>
                                        </div>

                                    </div>
                                    <div className="progressBarBox d-flex align-items-center">
                                        <span className='mr-3'>1 star</span>
                                        <div className='progress' style={{ width: '78%', height: '20px' }}>
                                            <div style={{ width: "25%", height: "20px" }} className="progress-bar bg-success" >25%</div>
                                        </div>

                                    </div>

                                </div>

                                {/* <br className='res-hide' />
                                <br className='res-hide' /> */}

                                <form className='reviewForm' onSubmit={addReview}>
                                    <h4>Add a review</h4>
                                    <div className="form-group">
                                        <textarea className="form-control shadow" id="" placeholder='Write a Review' name='review' style={{ height: "250px" }} value={reviews.review} onChange={onChangeInput}></textarea>
                                    </div>

                                    <div className="row mt-3">
                                        {/* <div className="col-md-6">
                                            <div className="form-group ">
                                                <input name='customerName ' type="text" className='form-control shadow' placeholder='Name' style={{ height: "55px" }} onChange={onChangeInput} />
                                            </div>
                                        </div> */}

                                        <div className="col-md-6">
                                            <div className="form-group" style={{ marginTop: "5px" }}>
                                                <Rating name='customerRating' value={rating} onChange={onChangeRating}></Rating>
                                            </div>
                                        </div>
                                    </div>

                                    <br />
                                    <div className="form-group">
                                        <Button style={{ height: "50px" }} type='submit' className=' btn-blue btn-lg btn-big btn-round'>
                                            {isLoading === true ? <CircularProgress color="inherit" className=" loader" /> : " SUBMIT REVIEW "}

                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    }


                </div>
            </div>

        </>
    )
}

export default Description;