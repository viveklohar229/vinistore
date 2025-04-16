import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import { useContext, useEffect, useState } from 'react';
import { BsGridFill } from "react-icons/bs";
import { CgMenuGridR } from "react-icons/cg";
import { FaAngleDown } from "react-icons/fa6";
import { IoMdMenu } from "react-icons/io";
import { TfiLayoutGrid4Alt } from "react-icons/tfi";
import { Link } from "react-router-dom";
import { MyContext } from '../../App';
import ProductItem from "../../Components/ProductItem";
import Sidebar from "../../Components/Sidebar";
import { fetchDataFromApi } from "../../utils/api";

const SearchPage = () => {
    const [circleLoader, setCircleLoader] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [productData, setProductData] = useState(null);
    const [productView, setProductView] = useState('four');
    const openDropdown = Boolean(anchorEl);

    const context = useContext(MyContext)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // const { id } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
        // setCircleLoader(true);
        setTimeout(() => {
            setProductData(context.searchData)
            // setCircleLoader(false);
        }, 3000)
    }, [context.searchData]) //id krna h listing me

    const filterData = (subCatId) => {
        setCircleLoader(true)
        fetchDataFromApi(`/api/products?subCatId=${subCatId}`).then((res) => {
            setProductData(res.products);
            setCircleLoader(false)
        })
    }

    const filterByPrice = (price, subCatId) => {
        setCircleLoader(true)
        fetchDataFromApi(`/api/products?minPrice=${price[0]}&maxPrice=${price[1]}&subCatId=${subCatId}`).then((res) => {
            setProductData(res.products);
            setCircleLoader(false)
        })
    }

    const filterByRating = (rating) => {
        setCircleLoader(true)
        fetchDataFromApi(`/api/products?rating=${rating}`).then((res) => {
            setProductData(res.products);
            console.log(res.products)
            setCircleLoader(false)
        })
    }




    return (
        <>
            <section className="product_Listing_Page mt-4">
                <div className="container">
                    <div className="productListing d-flex ">
                        <Sidebar filterData={filterData} filterByPrice={filterByPrice} filterByRating={filterByRating} />

                        <div className="content_right">
                            <Link to="#" > <img src="https://klbtheme.com/bacola/wp-content/uploads/2021/08/bacola-banner-18.jpg" className="w-100 " alt="" /> </Link>


                            <div className="showBy mt-3 mb-3 d-flex align-items-center">
                                <div className="d-flex align-items-center btnWrapper" >
                                    <Button className={productView === 'one' && 'act'} onClick={() => setProductView('one')}><IoMdMenu></IoMdMenu></Button>
                                    <Button className={productView === 'two' && 'act'} onClick={() => setProductView('two')}><BsGridFill></BsGridFill></Button>
                                    <Button className={productView === 'three' && 'act'} onClick={() => setProductView('three')}><CgMenuGridR></CgMenuGridR></Button>
                                    <Button className={productView === 'four' && 'act'} onClick={() => setProductView('four')}><TfiLayoutGrid4Alt></TfiLayoutGrid4Alt></Button>
                                </div>

                                <div className="ml-auto showByFilter">
                                    <Button onClick={handleClick}>Show 9 <FaAngleDown></FaAngleDown></Button>
                                    <Menu
                                        className="w-100 showPerPageDropdown"
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={openDropdown}
                                        onClose={handleClose}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                    >
                                        <MenuItem onClick={handleClose}>10</MenuItem>
                                        <MenuItem onClick={handleClose}>20</MenuItem>
                                        <MenuItem onClick={handleClose}>30</MenuItem>
                                        <MenuItem onClick={handleClose}>40</MenuItem>
                                        <MenuItem onClick={handleClose}>50</MenuItem>
                                        <MenuItem onClick={handleClose}>60</MenuItem>
                                    </Menu>
                                </div>

                            </div>


                            <div className="productListing">
                                {
                                    circleLoader === true ?
                                        <div className="loading d-flex align-items-center justify-content-center">
                                            <CircularProgress />
                                        </div>
                                        :
                                        <>
                                            {
                                                productData?.map((item, index) => {
                                                    return (
                                                        <ProductItem itemView={productView} key={index} item={item} />
                                                    )
                                                })
                                            }
                                        </>
                                }
                                
                            </div>

                            <div className="d-flex align-items-center justify-content-center mt-5">

                                <Pagination count={10} color="primary" size="large" />
                            </div>
                        </div>

                    </div>
                </div>

            </section>
        </>
    )
}

export default SearchPage;