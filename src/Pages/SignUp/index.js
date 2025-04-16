/* eslint-disable jsx-a11y/anchor-is-valid */
import { CircularProgress } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useContext, useEffect, useState } from "react";
import { FaFacebookF, FaGithub, FaGoogle, FaTwitter } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../../App";
import Logo from '../../assets/images/vini.webp';
import { postData } from '../../utils/api';


import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase";

const SignUp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [formFields, setFormFields] = useState({
        name: "",
        phone: "",
        email: "",
        password: "",
        isAdmin: false
    })
    const context = useContext(MyContext);
    useEffect(() => {
        context.setisHeaderFooterShow(false);
    }, []);


    const history = useNavigate();

    const onchangeInput = (e) => {
        setFormFields(() => ({
            ...formFields,
            [e.target.name]: e.target.value
        }))
    }


    const register = async (e) => {
        e.preventDefault();
        console.log(formFields)
        try {
            if (formFields.name === "") {
                context.setalertBox({
                    open: true,
                    error: true,
                    msg: "Please enter your name !"
                })
                return false
            }
            if (formFields.phone === "") {
                context.setalertBox({
                    open: true,
                    error: true,
                    msg: "Please enter your phone number !"
                })
                return false
            }
            if (formFields.email === "") {
                context.setalertBox({
                    open: true,
                    error: true,
                    msg: "Please enter your email id !"
                })
                return false
            }
            if (formFields.password === "") {
                context.setalertBox({
                    open: true,
                    error: true,
                    msg: "Please enter your password !"
                })
                return false
            }


            setIsLoading(true)
            const res = await postData("/api/user/signup", formFields);

            if (res && res.status === true) {
                context.setalertBox({ open: true, error: false, msg: "Sign Up successful!" });

                localStorage.setItem("userEmail", formFields.email);

                setTimeout(() => {
                    setIsLoading(false);
                    // history("/signIn")
                    history("/verifyOTP")
                }, 2000)
                setTimeout(()=>{
                    context.setalertBox({ 
                        open: true, 
                        error: false, 
                        msg: "OTP sent! Please check your inbox. If not found, check spam and mark it as 'Not Spam'. !" });
                },5000)

            } else if (res && res.status === false && res.message.includes("User with this email or phone already exists")) {
                setIsLoading(false);
                context.setalertBox({ open: true, error: true, msg: "User already registered with this email or phone!" });
            } else {
                setTimeout(() => {
                    setIsLoading(false);
                }, 2000)
                context.setalertBox({ open: true, error: true, msg: "Registration failed. Please try again!" });
            }
        } catch (error) {
            setIsLoading(false);
            console.log(error)
        }

    }


    const signUpWithGoogle = () => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                // ...

                const fields = {
                    name: user.providerData[0].displayName,
                    email: user.providerData[0].email,
                    password: null,
                    images: user.providerData[0].photoURL,
                    phone: user.providerData[0].phoneNumber,

                }

                postData("/api/user/authWithGoogle", fields).then((res) => {
                    try {
                        if (res.error !== true) {
                            // localStorage.setItem("token", token);
                            localStorage.setItem("token", res.token);

                            const user = {
                                name: res.user?.name,
                                email: res.user?.email,
                                userId: res.user?.id,
                            };

                            localStorage.setItem("user", JSON.stringify(user));

                            context.setalertBox({
                                open: true,
                                error: false,
                                msg: res.msg || "User Login Successfully !",
                            });

                            setTimeout(() => {
                                setIsLoading(false);
                                history("/")
                                // window.location.href = "/"
                            }, 2000);
                        } else {
                            context.setalertBox({
                                open: true,
                                error: true,
                                msg: res.msg || "User Login Failed !",
                            });
                            setIsLoading(false);
                        }
                    } catch (error) {
                        console.log(error);
                        setIsLoading(false);
                    }
                });


                context.setalertBox({
                    open: true,
                    error: false,
                    msg: "User Authentication Successfully !"
                });

            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                context.setalertBox({
                    open: true,
                    error: true,
                    msg: errorMessage,
                });

                // ...
            });
    };

    return (
        <>
            <section className="section  signInPage signUpPage">
                <div className="shape-bottom">
                    <svg fill="#fff" id="Layer_1" x="0px" y="0px" viewBox="0 0 1921 819.8" style={{ enableBackground: "new 0 0 1921 819.8" }}><path class="st0" d="M1921,413.1v406.7H0V0.h0.41228.1,598.3c30,74.4,80.8,130.6,152.5,168.6c107.6,57,212.1,40.7,245.7,34.4, c22.4-4.2,54.9-13.1,97.5-26.6L1921,400.5V413.1z"></path> <polygon class="mystar" fill="#3CB54A" points="134.973,14.204 143.295,31.066 161.903,33.77 148.438,46.896 151.617,65.43 134.973,56.679 
    118.329,65.43 121.507,46.896 108.042,33.77 126.65,31.066 "/>
                        <circle class="mycircle" fill="#ED1F24" cx="202.028" cy="58.342" r="12.26" /></svg>

                </div>
                <div className="container">
                    <div className=" box card p-3 shadow border-0">
                        <div className="text-center signIn">
                            <img src={Logo} alt="" />
                        </div>

                        <form className="mt-2" onSubmit={register}>
                            <h2 className="mb-3">Sign Up</h2>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <TextField label="Name" type="text" variant="standard" className="w-100" name="name" onChange={onchangeInput} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <TextField label="Contact No." type="text" variant="standard" className="w-100 " name="phone" onChange={onchangeInput} />
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <TextField id="standard-basic" label="Email" type="email" variant="standard" className="w-100" name="email" onChange={onchangeInput} />
                            </div>
                            <div className="form-group">
                                <TextField id="standard-basic" label="Password" type="password" className="w-100" variant="standard" name="password" onChange={onchangeInput} />
                            </div>



                            <a href="" className="border-effect cursor txt">Forget Password ?</a>

                            <div className="d-flex align-items-center mt-3 mb-3 ">

                                <div className="row w-100">
                                    <div className="col-md-6">
                                        <Button type='submit' disabled={isLoading === true ? true : false} className="btn-blue btn-lg btn-big col w-100" >
                                            {
                                                isLoading === true ? <CircularProgress size={25} color="inherit" sx={{ color: "white" }} /> : 'Sign In'
                                            }
                                        </Button>
                                    </div>
                                    <div className="col-md-6 ">
                                        <Link to="/" className='w-100 d-block'><Button onClick={() => context.setisHeaderFooterShow(true)} variant="outlined" className="  btn-lg btn-big col w-100">Cancel</Button></Link>
                                    </div>
                                </div>
                            </div>

                            <p className="txt">Already SignUp?
                                <Link to="/signIn" className="border-effect" >Sign In</Link>
                            </p>

                            <h6 className="mt-2 text-center font-weight-bold">Or continue with social account</h6>

                            {/* <span className="cursor"> <img src={GoogleImg}alt="" className="w-100" /></span> */}
                            <ul className="list list-inline mt-3 mb-1 socials text-center">
                                <li className="list-inline-item">
                                    <Link to="#" onClick={signUpWithGoogle}><FaGoogle /></Link>
                                </li>
                                <li className="list-inline-item">

                                    <Link to="#"><FaFacebookF /></Link>
                                </li>
                                <li className="list-inline-item">
                                    <Link to="#"><FaTwitter /></Link>
                                </li>
                                <li className="list-inline-item">
                                    <Link to="#"><FaGithub /></Link>
                                </li>

                            </ul>



                        </form>
                    </div>
                </div>

            </section>
        </>
    )
}

export default SignUp;