import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import React, { useContext, useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { IoClose, IoSearchSharp } from "react-icons/io5";
import { MyContext } from "../../App";
import { fetchDataFromApi } from '../../utils/api';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CountryDropdown = () => {
    const [isOpenModel, setisOpenModel] = useState(false);
    const [selectedTab, setselectedTab] = useState(null);
    const [countryList, setcountryList] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("All");

    const context = useContext(MyContext);

    useEffect(() => {
        setcountryList(context.countryList);
        
        const defaultSelection = context.selectedCountry === "All" || !context.selectedCountry ? 0 : context.countryList.findIndex(item => item.iso2 === context.selectedCountry);
        setselectedTab(defaultSelection);
    
        // Ensure that "All" location is passed when the page loads
        if (context.selectedCountry === "All" || !context.selectedCountry) {
            fetchDataFromApi({ location: "All" }); // Call your fetch function with "All" for location
        }
    }, [context.selectedCountry]); // Re-run when context.selectedCountry changes
    



    const selectCountry = (index, country) => {
        setselectedTab(index);
        setisOpenModel(false);
        context.setselectedCountry(country);
        localStorage.setItem("location", country);
        window.location.href = window.location.href;
    }

    useEffect(() => {
        setcountryList(context.countryList);

        console.log("location", context.countryList)
    }, [])



    const filterList = (e) => {
        const keyword = e.target.value.toLowerCase();

        if (keyword !== "") {
            const list = countryList.filter((item) => {
                return item.country.toLowerCase().includes(keyword);
            });
            setcountryList(list);
        } else {
            setcountryList(context.countryList);
        }

    }

    return (
        <>
          
            <Button className='countryDrop' onClick={() => setisOpenModel(true)}>
                <div className="info d-flex flex-column">
                    <span className="label">Your Location</span>
                    <span className="name">
                        {context.selectedCountry === "All" || context.selectedCountry === ""
                            ? 'All'  // Show "All" if selectedCountry is empty or "All"
                            : (context.selectedCountry.length > 10
                                ? context.selectedCountry?.substr(0, 10) + '...'
                                : context.selectedCountry)}
                    </span>
                </div>
                <span className="arrow"><FaAngleDown /></span>
            </Button>


            <Dialog open={isOpenModel} onClose={() => setisOpenModel(false)} className="locationModel" TransitionComponent={Transition}>
                <h4 className="chooseArea">Choose your Delivery Location</h4>
                <p>Enter your address and we will specify the offer for your area.</p>
                <Button className="close_" onClick={() => setisOpenModel(false)}><IoClose></IoClose></Button>
                <div className='headerSearch w-100 searchArea '>
                    <input type="text" placeholder="Search your area..." onChange={filterList} />
                    <Button><IoSearchSharp></IoSearchSharp> </Button>
                </div>

                <ul className="countryList">
                    <li><Button onClick={() => selectCountry(0, "All")}
                    >All</Button></li>
                    {
                        countryList?.length !== 0 && countryList?.map((item, index) => {
                            return (
                                <li key={index}>
                                    <Button onClick={() => selectCountry(index, item.iso2)}
                                        className={`${selectedTab === index ? 'active' : ''}`}
                                        style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                                    >
                                        <img
                                            src={`https://flagcdn.com/w40/${item.iso2.toLowerCase()}.png`}
                                            alt={item.country}
                                            style={{ width: '24px' }}
                                        />
                                        {item.country}
                                    </Button>
                                </li>

                            )
                        })
                    }
                </ul>


            </Dialog>
        </>
    )
}

export default CountryDropdown