import { useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { IoHome, IoMenu } from "react-icons/io5";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';





const Navbar = (props) => {

    const [isopenSidebarVal, setisopenSidebarVal] = useState(false);



    return (
        <nav>
            <div className="container">
                <div className="row">
                    <div className="navPart1 col-sm-2">
                        <div className="catWrapper">
                            <Button className='allCatTab align-items-center' onClick={() => setisopenSidebarVal(!isopenSidebarVal)}>
                                <span className="menu"><IoMenu></IoMenu></span>
                                <span className='text'>ALL CATEGORIES</span>
                                <span className="arrow"><FaAngleDown /></span>
                            </Button>
                            <div className={`sidebarNav ${isopenSidebarVal === true ? 'open' : ''}`}>
                                {
                                    props.navData?.length !== 0 && props.navData?.map((item, index) => {
                                        return (
                                            <ul>
                                                <li>
                                                    <Link to={`/subCat/${item.id}`}><Button>{item.subCat}</Button></Link>
                                                </li>
                                            </ul>
                                        )
                                    })
                                }


                            </div>
                        </div>
                    </div>
                    <div className="navPart2 col-sm-10 d-flex align-items-center">
                        <ul className="list list-inline w-100 ml-auto ">
                            <li className=" list-inline-item "><Link to="/"><Button><IoHome /> &nbsp; Home</Button></Link></li>
                            {
                                props.navData?.length !== 0 && props.navData?.slice(0, 8).map((item, index) => {
                                    return (
                                        <li className=" list-inline-item">
                                            <Link to={`/subCat/${item.id}`}><Button><img src={item?.category?.images[0]} alt="catImg" className=' shadow' style={{ width: "20px", height: "20px" }} /> &nbsp;{item.subCat?.substr(0,13)}</Button></Link>
                                        </li>
                                    )
                                })
                            }

                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;