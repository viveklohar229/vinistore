import { Person } from "@mui/icons-material";
import Logout from '@mui/icons-material/Logout';
import Settings from '@mui/icons-material/Settings';
import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useContext, useState } from 'react';
import { BsCart4 } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { GiShoppingCart } from "react-icons/gi";
import { Link, useNavigate } from 'react-router-dom';
import { MyContext } from '../../App';
import Logo from '../../assets/images/vini.webp';
import CountryDropdown from '../CountryDropdown';
import Navbar from './Navbar';
import SearchBox from './SearchBox';

const Header = () => {

    const context = useContext(MyContext);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const history = useNavigate();
    const logout = () => {
        localStorage.clear();
        setAnchorEl(null);
        window.location.href = "/"
        context.setalertBox({
            open: true,
            error: false,
            msg: "User Logout successfully !"
        })

    }

    return (
        <>
            <div className="headerWrapper ">
                <div className="top-strip bg-blue">
                    <div className="container">
                        <p className="mb-0 mt-0 text-center">Due to the <b>COVID 19</b>  epidemic, orders may be processed with a slight delay</p>
                    </div>
                </div>
                <header className="header">
                    <div className="container">
                        <div className="row">
                            <div className="logoWrapper d-flex align-items-center col-sm-1">
                                <Link to={'/'}><img src={Logo} alt='Logo'></img></Link>

                            </div>

                            <div className='col-sm-10 d-flex align-items-center part2'>
                              
                                {
                                    context.countryList.length !== 0 && 
                                    <CountryDropdown />
                                }
                                <SearchBox></SearchBox>
                                <div className="part3 d-flex align-items-center ml-auto gap-2">
                                    {/* {
                                        context.isLogin !== true ? <Link to="/signIn"> <Button className='btn-blue btn-round'>Sign In</Button> </Link> : <button className="profile mr-3 " ><LuUserRound></LuUserRound></button>
                                    } */}
                                    {
                                        context.isLogin !== true ? <Link to="/signIn"> <Button className='btn-blue btn-round'>Sign In</Button> </Link> :
                                            <>
                                                <button onClick={handleClick} className="profile mr-3 " >{context.user.name?.charAt(0)}</button>
                                                <Menu
                                                    anchorEl={anchorEl}
                                                    id="account-menu"
                                                    open={open}
                                                    onClose={handleClose}
                                                    onClick={handleClose}
                                                    slotProps={{
                                                        paper: {
                                                            elevation: 0,
                                                            sx: {
                                                                overflow: 'visible',
                                                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                                                mt: 1.5,
                                                                '& .MuiAvatar-root': {
                                                                    width: 32,
                                                                    height: 32,
                                                                    ml: -0.5,
                                                                    mr: 1,
                                                                },
                                                                '&::before': {
                                                                    content: '""',
                                                                    display: 'block',
                                                                    position: 'absolute',
                                                                    top: 0,
                                                                    right: 14,
                                                                    width: 10,
                                                                    height: 10,
                                                                    bgcolor: 'background.paper',
                                                                    transform: 'translateY(-50%) rotate(45deg)',
                                                                    zIndex: 0,
                                                                },
                                                            },
                                                        },
                                                    }}
                                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                                >
                                                    <Link to="/myAccount">
                                                        <MenuItem onClick={handleClose}>
                                                            <ListItemIcon>
                                                                <Person fontSize="small" />
                                                            </ListItemIcon>My Account
                                                        </MenuItem>
                                                    </Link>
                                                    <Link to="/orders">
                                                        <MenuItem onClick={handleClose}>
                                                            <ListItemIcon>
                                                                <BsCart4 fontSize="large" />
                                                            </ListItemIcon>
                                                            My Orders
                                                        </MenuItem>
                                                    </Link>
                                                    <Link to="/myList"> <MenuItem onClick={handleClose}>
                                                        <ListItemIcon>
                                                            <FaHeart />
                                                        </ListItemIcon>
                                                        My List
                                                    </MenuItem>
                                                    </Link>
                                                    <MenuItem onClick={handleClose} disabled>
                                                        <ListItemIcon>
                                                            <Settings fontSize="small" />
                                                        </ListItemIcon>
                                                        Settings
                                                    </MenuItem>
                                                    <MenuItem onClick={logout}>
                                                        <ListItemIcon>
                                                            <Logout fontSize="small" />
                                                        </ListItemIcon>
                                                        Logout
                                                    </MenuItem>
                                                </Menu>
                                            </>

                                    }


                                    <div className="cartTab d-flex align-items-center">

                                        <span className="price">
                                            &#8377; &nbsp;
                                            {
                                                context.cartData?.length !== 0 &&
                                                context.cartData?.map(item => parseInt(item?.price) * item.quantity).reduce((total, value) => total + value, 0)

                                            }

                                        </span>
                                        <div className="position-relative">
                                            <Link to="/Cart">   <button className="profile"><GiShoppingCart></GiShoppingCart> </button></Link>
                                            <span className="count d-flex align-items-center justify-content-center">
                                                {context.cartData?.length}
                                            </span>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </header>


                {/* {
                    context.categoryData?.length !== 0 && <Navbar navData={context.categoryData} />
                } */}
                {
                    context.subCategoryData?.length !== 0 && <Navbar navData={context.subCategoryData} />
                }
                {/* {
                    (context.categoryData?.length !== 0 || context.subCategoryData?.length !== 0) && (
                        <Navbar navData={[...(context.categoryData || []), ...(context.subCategoryData || [])]} />
                    )
                } */}


                {/* <Navbar></Navbar> */}
            </div>
        </>
    )
}

export default Header;