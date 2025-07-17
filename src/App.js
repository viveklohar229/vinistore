import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { createContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductModal from "../src/Components/ProductModal";
import './App.css';
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Cart from './Pages/Cart';
import ChangePassword from './Pages/ChangePassword';
import Checkout from './Pages/Checkout';
import Home from "./Pages/Home";
import Listing from "./Pages/Listing";
import MyAccount from './Pages/myAccount/index';
import MyList from './Pages/MyList';
import NetworkStatus from './Pages/NetworkStatus/index';
import Orders from './Pages/Orders';
import ProductDetails from './Pages/ProductDetails';
import SearchPage from './Pages/Serach';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import VerifyOTP from './Pages/VerifyOPT';
import { fetchDataFromApi, postData } from './utils/api';
// import OtpBox from './Components/OtpBox';
import PageLoader from './Pages/PageLoader';


const MyContext = createContext();


function App() {
  const [showLoader, setShowLoader] = useState(true);
  const [productData, setProductData] = useState();
  const [categoryData, setCategoryData] = useState([]);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [isOpenProductModal, setisOpenProductModal] = useState({
    id: '',
    open: false
  });
  const [countryList, setCountryList] = useState([]);
  const [selectedCountry, setselectedCountry] = useState('');
  const [isHeaderFooterShow, setisHeaderFooterShow] = useState(true);
  const [windowWidth, setwindowWidth] = useState(window.innerWidth);
  const [enableFilterTab, setEnableFilterTab] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [activeCat, setActiveCat] = useState('');
  const [alertBox, setalertBox] = useState({
    msg: " ",
    error: false,
    open: false
  })
  const [user, setUser] = useState({
    name: "",
    email: "",
    userId: "",
  })

  const [cartData, setCartData] = useState();
  const [addingInCart, setAddingInCart] = useState(false);
  const [searchData, setSearchData] = useState([]);



  useEffect(() => {
    getCountry("https://countriesnow.space/api/v0.1/countries/");


    fetchDataFromApi("/api/category").then((res) => {
      setCategoryData(res.categoryList);
      setActiveCat(res.categoryList?.name)
    })
    fetchDataFromApi("/api/subCat").then((res) => {
      setSubCategoryData(res.SubCategoryList);
    })

    fetchDataFromApi("/api/cart").then((res) => {
      setCartData(res)
    })
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setwindowWidth(window.innerWidth);
    };

    const location = localStorage.getItem("location");
    if (location !== "" && location !== null && location !== undefined) {
      setselectedCountry(location)
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };



  }, [])

  useEffect(() => {
    isOpenProductModal.open === true &&
      fetchDataFromApi(`/api/products/${isOpenProductModal.id}`).then((res) => {
        setProductData(res);
      })

  }, [isOpenProductModal])

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null && token !== undefined && token !== "") {
      setIsLogin(true);

      const userData = JSON.parse(localStorage.getItem("user"));
      setUser(userData);
    } else {
      setIsLogin(false);
    }
  }, [isLogin])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setalertBox({
      open: false,
    });
  };


  const getCartData = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    fetchDataFromApi(`/api/cart?userId=${user?.userId}`).then((res) => {
      setCartData(res);
    })
  }


  const addToCart = (data) => {
    setAddingInCart(true);
    postData(`/api/cart/add`, data).then((res) => {
      if (res.status === true) {
        setalertBox({
          open: true,
          error: false,
          msg: res.msg || "Product added to cart successfully"
        })
        setTimeout(() => {
          setAddingInCart(false);
        }, 1000)


      } else {
        setalertBox({
          open: true,
          error: true,
          msg: res.msg || "Product already exists in cart"
        });
        setTimeout(() => {
          setAddingInCart(false);
        }, 1000);
      }
    }).catch((err) => {
      setalertBox({
        open: true,
        error: true,
        msg: "Server error. Please try again."
      });
      setAddingInCart(false);
    });
  };





  const getCountry = async (url) => {
    const responsive = await axios.get(url).then((res) => {
      setCountryList(res.data.data)
      // console.log(res.data.data)
    })
  }

  const values = {
    countryList,
    setCountryList,
    setselectedCountry,
    selectedCountry,
    setisOpenProductModal,
    isOpenProductModal,
    isHeaderFooterShow,
    setisHeaderFooterShow,
    isLogin,
    setIsLogin,
    categoryData,
    setCategoryData,
    subCategoryData,
    setSubCategoryData,
    activeCat,
    setActiveCat,
    alertBox,
    setalertBox,
    user,
    setUser,
    addToCart,
    addingInCart,
    setAddingInCart,
    cartData,
    setCartData,
    searchData,
    setSearchData,
    enableFilterTab,
    setEnableFilterTab,
    windowWidth,
    setwindowWidth,
    getCartData,
    showLoader,
    setShowLoader
  }
  const closeProductModal = () => {
    setisOpenProductModal(false);
  }


  return (
    <BrowserRouter>
      {/* {showLoader && <PageLoader />} */}
      <NetworkStatus>
        <MyContext.Provider value={values}>
          <Snackbar open={alertBox.open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity={alertBox.error === false ? "success" : "error"}
              variant="filled"
              sx={{ width: '100%' }}
            >
              {alertBox.msg}
            </Alert>
          </Snackbar>
          {
            isHeaderFooterShow === true && <Header />
          }

          <Routes>
            <Route path="/" exact={true} element={<Home />} />
            {/* <Route path="/products/category/:id" exact={true} element={<Listing />} />
          <Route path="/products/subCat/:id" exact={true} element={<Listing />} /> */}
            <Route path="/subCat/:id" exact={true} element={<Listing />} />
            <Route path="/product/:id" exact={true} element={<ProductDetails />} />
            <Route path="/cart" exact={true} element={<Cart />} />
            <Route path="/signIn" exact={true} element={<SignIn />} />
            <Route path="/signUp" exact={true} element={<SignUp />} />
            <Route path="/myList" exact={true} element={<MyList />} />
            <Route path="/checkout" exact={true} element={<Checkout />} />
            <Route path="/orders" exact={true} element={<Orders />} />
            <Route path="/MyAccount" exact={true} element={<MyAccount />} />
            <Route path="/search" exact={true} element={<SearchPage />} />
            <Route path="/verifyOTP" exact={true} element={<VerifyOTP />} />
            <Route path="/changePassword" exact={true} element={<ChangePassword />} />
          </Routes>
          {
            isHeaderFooterShow === true && <Footer />
          }

          {
            isOpenProductModal.open === true && <ProductModal closeProductModal={closeProductModal} data={productData}></ProductModal >
          }
        </MyContext.Provider>
      </NetworkStatus>
    </BrowserRouter>
  );
}

export default App;

export { MyContext };

