import { IoSearchSharp } from "react-icons/io5";
import Button from '@mui/material/Button';
import { useContext, useState } from "react";
import { fetchDataFromApi } from "../../../utils/api";
import { MyContext } from "../../../App";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';


const SearchBox = () => {

    const [searchFields, setSearchFields] = useState("");
    const [loading, setLoading] = useState(false);
    const context = useContext(MyContext);
    const history = useNavigate();

    const onChangeValue = (e) => {
        setSearchFields(e.target.value);
    }

    const searchProducts = () => {
        setLoading(true)
        fetchDataFromApi(`/api/search?q=${searchFields}`).then((res) => {
            context.setSearchData(res);
            setTimeout(()=>{
                setLoading(false);
            },2000);
            history("/search");
        })
    }




    return (
        <div className='headerSearch '>
            <input type="text" placeholder="Search for products..." onChange={onChangeValue} />
            <Button onClick={searchProducts}>
                {
                    loading === true ? <CircularProgress color="inherit" style={{width:"18px" , height: "18px"}} /> : <IoSearchSharp />
                }
            </Button>
        </div>
    )
}
export default SearchBox;