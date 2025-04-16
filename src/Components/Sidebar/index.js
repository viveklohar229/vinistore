import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Rating from '@mui/material/Rating';
import React, { useContext, useEffect, useState } from 'react';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { Link, useParams } from 'react-router-dom';
import { MyContext } from '../../App';


const Sidebar = (props) => {
    const context = useContext(MyContext);
    const [value, setValue] = useState([100, 60000]);
    const [value2, setValue2] = useState(0);
    const [filterSubCat, setFilterSubCat] = useState('');
    const [subCatId, setSubCatId] = useState('');

    const { id } = useParams();
    useEffect(() => {
        setSubCatId(id);
    }, [id])


    const handleChange = (event) => {
        const selectedSubCatId = event.target.value;
        setFilterSubCat(selectedSubCatId);
        props.filterData(selectedSubCatId); // Let parent manage subCatId
    };
    

   
    useEffect(() => {
        props.filterByPrice(value); // Parent already has correct subCatId
    }, [value]);
    
    const filterByRating = (rating) => {
        props.filterByRating(rating); // Same here
    }
    
   




    return (
        <>
            <div className="sidebar">
                <div className="sticky">
                    <div className="filterBox">
                        <h6>PRODUCT CATEGORIES</h6>

                        <div className="scroll">
                            <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={filterSubCat}
                                onChange={handleChange}
                            >
                                {
                                    context.subCategoryData?.length !== 0 && context.subCategoryData?.map((item, index) => {
                                        return (
                                            <FormControlLabel value={item.id} control={<Radio />} label={item.subCat} />
                                            // <li><FormControlLabel className='w-100' control={<Radio onChange={() => filterBySubCat(item.id)} />} label={item.subCat} /></li>

                                        )
                                    })
                                }
                            </RadioGroup>
                            <ul>
                            </ul>

                        </div>
                    </div>
                    <div className="filterBox">
                        <h6>FILTER BY PRICE</h6>

                        <RangeSlider value={value} onInput={setValue} min={100} max={60000} step={5}></RangeSlider>
                        <div className="d-flex pt-2 pb-2 priceRange">
                            <span>From: <strong className='text-dark'>Rs: {value[0]} </strong></span>
                            <span className='ml-auto'>From: <strong className='text-dark'>Rs: {value[1]} </strong> </span>
                        </div>
                    </div>



                    <div className="filterBox">
                        <h6>FILTER BY RATING</h6>
            
                        <div className="scroll  pl-0 cursor">
                        
                            <ul>
                                <li onClick={() => filterByRating(5)}><Rating name="read-only" value={5} readOnly size="small" /></li>
                                <li onClick={() => filterByRating(4)}><Rating name="read-only" value={4} readOnly size="small" /></li>
                                <li onClick={() => filterByRating(3)}><Rating name="read-only" value={3} readOnly size="small" /></li>
                                <li onClick={() => filterByRating(2)}> <Rating name="read-only" value={2} readOnly size="small" /></li>
                                <li onClick={() => filterByRating(1)}> <Rating name="read-only" value={1} readOnly size="small" /></li>
                            </ul>







                        </div>
                    </div>

                    <br></br>

                    <Link to="#"><img src='https://klbtheme.com/bacola/wp-content/uploads/2021/05/sidebar-banner.gif' className='w-100'></img></Link>
                </div>
            </div>
        </>
    )
}

export default Sidebar;