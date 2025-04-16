import { useContext, useState } from "react";
import { MyContext } from "../../App";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import password from "../../assets/images/password.png";
import { CircularProgress } from '@mui/material';
import Button from '@mui/material/Button';
import { postData } from "../../utils/api";
import OtpBox from '../../Components/OtpBox/index'


const VerifyOTP = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [otp, setOtp] = useState("");


    const context = useContext(MyContext);
    const history = useNavigate();

    const handleOtpChange = (value) => {
        setOtp(value);
    };

    useEffect(() => {
        context.setisHeaderFooterShow(false);

        context.setEnableFilterTab(false);
    }, []);

    const verify = (e) => {
        e.preventDefault();
        const obj = {
            otp: otp,
            email: localStorage.getItem('userEmail'),
        };
        if (otp !== "") {
            const actionType = localStorage.getItem("actionType");
            postData(`/api/user/verifyEmail`, obj).then((res) => {
                if (res?.success === true) {
                    context.setalertBox({
                        open: true,
                        error: false,
                        msg: res?.message || " Email Verified Successfully !",
                    });
                    setIsLoading(false);


                    if (actionType !== "changePassword") {
                        localStorage.removeItem("userEmail");
                        history("/signIn");
                    }
                    else {
                        history("/changePassword");
                    }

                } else {
                    context.setalertBox({
                        open: true,
                        error: true,
                        msg: res?.message || "Invalid OTP",
                    });
                    setIsLoading(false);
                }
            });
        } else {
            context.setalertBox({
                open: true,
                error: true,
                msg: "Please enter OTP !",
            });
        }

    }

    const handleResendOtp = () => {
        const obj = { email: localStorage.getItem("userEmail") };

        postData(`/api/user/verifyAccount/resendOtp`, obj).then((res) => {
            if (res.success) {
                context.setalertBox({
                    open: true,
                    error: false,
                    msg: "New OTP sent to your email. Please check inbox or spam folder.",
                });
            } else {
                context.setalertBox({
                    open: true,
                    error: true,
                    msg: res.message || "Failed to resend OTP.",
                });
            }
        }).catch((err) => {
            context.setalertBox({
                open: true,
                error: true,
                msg: "Something went wrong while resending OTP.",
            });
            console.error("Resend OTP error:", err);
        });
    };





    return (
        <section className="section signInPage otpPage">
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
                </svg>
            </div>

            <div className="container">
                <div className="box card p-3 shadow border-0">
                    <div className="text-center">
                        <img src={password} width={"100px"} alt="" />
                    </div>

                    <form className="mt-3" onSubmit={verify}>
                        <h2 className="mb-1">OTP Verification</h2>
                        <p className="text-center text-light">
                            OTP has been sent to <b>{localStorage.getItem("userEmail")}</b>
                        </p>
                        <OtpBox length={6} onChange={handleOtpChange} />
                        <div className="d-flex align-items-center mt-3 mb-3">
                            <Button type="submit" className="btn-blue col btn-lg btn-big">
                                {isLoading === true ? <CircularProgress /> : "Verify OTP"}
                            </Button>
                        </div>
                        <p className="text-center">
                            <a className="border-effect cursor txt" onClick={handleResendOtp}>Resend OTP</a>
                        </p>

                        {/* <p className="text-cenetr"> <a className="border-effect cursor txt"> Resend OTP</a></p> */}
                    </form>

                </div>
            </div>
        </section>
    )
}

export default VerifyOTP;