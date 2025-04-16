
import { CircularProgress } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../App";
import Logo from '../../assets/images/vini.webp';
import { postData } from '../../utils/api';


const ChangePassword = () => {

    const context = useContext(MyContext);
    const [isLoading, setIsLoading] = useState(false);
    const [formFields, setFormFields] = useState({
        email: localStorage.getItem("userEmail"),
        newPassword: "",
        confirmPassword: "",
    })
    const history = useNavigate();

    useEffect(() => {
        context.setisHeaderFooterShow(false);
    }, []);

    const onchangeInput = (e) => {
        setFormFields(() => ({
            ...formFields,
            [e.target.name]: e.target.value
        }))
    }

    const changePassword = (e) => {
        e.preventDefault();
        if (formFields.newPassword === "") {
            context.setalertBox({
                open: true,
                error: true,
                msg: "Please enter new password !",
            });
            return false;
        }
        if (formFields.confirmPassword === "") {
            context.setalertBox({
                open: true,
                error: true,
                msg: "Please confirm  password !",
            });
            return false;
        }
        if (formFields.newPassword !== formFields.confirmPassword) {
            context.setalertBox({
                open: true,
                error: true,
                msg: " Password and Confirm  password not match !",
            });
            return false;
        }


        postData(`/api/user/forgetPassword/changePassword`, formFields).then((res) => {
            if (res.status === "SUCCESS") {
                context.setalertBox({
                    open: true,
                    error: false,
                    msg: res.message || " Your password has changed successfully !",
                });
                history("/login")
            }
        })
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

                        <form className="mt-3" onSubmit={changePassword}>
                            <h2 className="mb-4">Change Password</h2>
                            <div className="form-group ">
                                <TextField id="standard-basic" label="New Password" type="text" variant="standard" className="w-100" name="newPassword" onChange={onchangeInput} />
                            </div>
                            <div className="form-group">
                                <TextField id="standard-basic" label="Confirm Password" type="text" className="w-100" variant="standard" name="confirmPassword" onChange={onchangeInput} />
                            </div>
                            <Button type='submit' className='btn-blue col btn-big btn-lg w-100'>
                                {isLoading === true ? <CircularProgress /> : "SAVE"}
                            </Button>


                        </form>
                    </div>
                </div>

            </section>
        </>
    )
}

export default ChangePassword;