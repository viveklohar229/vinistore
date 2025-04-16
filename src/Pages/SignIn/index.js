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
// import GoogleImg from "../../assets/images/GoogleImg.png";

// import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { firebaseApp } from '../../firebase';
// const auth = getAuth(firebaseApp);
// const googleProvider = new GoogleAuthProvider();
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase";


const SignIn = () => {

    const context = useContext(MyContext);
    const [isLoading, setIsLoading] = useState(false);
    // const [isOpenVerifyEmailBox, setIsOpenVerifyEmailBox] = useState(false);
    const [formFields, setFormFields] = useState({
        email: "",
        password: "",
        isAdmin: true
    })
    const history = useNavigate();

    useEffect(() => {
        context.setisHeaderFooterShow(false);

        context.setEnableFilterTab(false);
    }, []);

    const onchangeInput = (e) => {
        setFormFields(() => ({
            ...formFields,
            [e.target.name]: e.target.value
        }))
    }

    const Login = async (e) => {
        e.preventDefault();

        if (!formFields.email) {
            return context.setalertBox({ open: true, error: true, msg: "Please enter your email ID!" });
        }

        if (!formFields.password) {
            return context.setalertBox({ open: true, error: true, msg: "Please enter your password!" });
        }

        try {
            setIsLoading(true)
            postData("/api/user/signin", formFields)
                .then((res) => {
                    console.log("API Response:", res);

                    if (res.error && res.error.status === false) {
                        setTimeout(() => {
                            setIsLoading(false);
                        }, 2000)
                        return context.setalertBox({
                            open: true,
                            error: true,
                            msg: res.error.message || "Login failed! Please check your credentials."
                        });

                    }

                    localStorage.setItem("token", res.token);
                    localStorage.setItem("user", JSON.stringify(res.user));

                    context.setalertBox({
                        open: true,
                        error: false,
                        msg: "User logged in successfully!"
                    });
                    setTimeout(() => {
                        setIsLoading(false);
                        window.location.href = "/";
                    }, 2000)

                })
                .catch((error) => {
                    setIsLoading(false);
                    console.log(error)
                    context.setalertBox({
                        open: true,
                        error: true,
                        msg: "Something went wrong. Please try again!"
                    });
                });


        } catch (error) {
            setIsLoading(false);
            context.setalertBox({ open: true, error: true, msg: "Something went wrong. Please try again!" });
        }
    };


    const signInWithGoogle = () => {
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

                };

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


    const forgetPassword = () => {
        if (formFields.email === "") {
            context.setalertBox({
                open: true,
                error: true,
                msg: "Please enter your email !",
            });
        } else {
            localStorage.setItem("userEmail", formFields.email);
            localStorage.setItem("actionType", "changePassword");
            postData(`/api/user/forgetPassword`, { email: formFields.email }).then((res) => {
                if (res.status === "SUCCESS") {
                    history("/verifyOTP");
                }
            })
        }
    }

    return (
        <>
            <section className="section signInPage">
                <div className="shape-bottom">
                    <svg
                        viewBox="0 0 1440 320"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ display: 'block' }}
                    >
                        <path
                            fill="#ffffff"
                            d="M0,128L60,122.7C120,117,240,107,360,122.7C480,139,600,181,720,186.7C840,192,960,160,1080,165.3C1200,171,1320,213,1380,234.7L1440,256L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
                        ></path>
                        <circle class="mycircle" fill="#ED1F24" cx="202.028" cy="58.342" r="12.26" />
                    </svg>
                </div>
                <div className="container">
                    <div className=" box card p-3 shadow border-0">
                        <div className="text-center signIn">
                            <img src={Logo} alt="" />
                        </div>

                        <form className="mt-3" onSubmit={Login}>
                            <h2 className="mb-4">
                                Sign In
                                {/* {
                                    isOpenVerifyEmailBox === false ? "SIGN IN" : "VERIFY EMAIL"
                                } */}
                            </h2>
                            <div className="form-group">
                                <TextField id="standard-basic" label="Email" type="email" variant="standard" className="w-100" name="email" onChange={onchangeInput} />
                            </div>
                            {/* {isOpenVerifyEmailBox === false ? (
                                <> */}
                            <div className="form-group">
                                <TextField id="standard-basic" label="Password" type="password" className="w-100" variant="standard" name="password" onChange={onchangeInput} />
                            </div>



                            <a className="border-effect cursor txt" onClick={forgetPassword}>Forget Password ?</a>

                            <div className="d-flex align-items-center mt-3 mb-3 gap-4">
                                <Button type='submit' disabled={isLoading === true ? true : false} className="btn-blue btn-lg btn-big col" >
                                    {
                                        isLoading === true ? <CircularProgress size={25} color="inherit" sx={{ color: "white" }} /> : 'Sign In'
                                    }
                                </Button>
                                <Link to="/"><Button onClick={() => context.setisHeaderFooterShow(true)} variant="outlined" className="  btn-lg btn-big col">Cancel</Button></Link>
                            </div>

                            <p className="txt">Not Registered?
                                <Link to="/signUp" className="border-effect" >Sign Up</Link>
                            </p>

                            <h6 className="mt-2 text-center font-weight-bold">Or continue with social account</h6>

                            {/* <span className="cursor"> <img src={GoogleImg}alt="" className="w-100" /></span> */}
                            <ul className="list list-inline mt-3 mb-1 socials text-center">
                                <li className="list-inline-item">
                                    <Link to="#" onClick={signInWithGoogle}><FaGoogle /></Link>
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
                            {/* </>
                            )
                                :
                                (
                                     <Button type='submit' className='btn-blue col btn-big btn-lg'>
                                        {isLoading === true ? <CircularProgress /> : "VERIFY EMAIL"}
                                      </Button>
                                )

                            } */}




                        </form>
                    </div>
                </div>

            </section>
        </>
    )
}

export default SignIn;