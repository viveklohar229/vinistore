import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { FaCloudUploadAlt } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';
import { MyContext } from '../../App';
import NoUserImg from '../../assets/images/no image.png';
import { deleteData, deleteImage, editData, fetchDataFromApi, uploadImage } from '../../utils/api';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}



const MyAccount = (props) => {
    const [isLogin, setIsLogin] = useState(false);
    const [imgFiles, setImgFiles] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setisUploading] = useState(false);
    const [previews, setPreviews] = useState([]);
    const [userData, setUserData] = useState([]);
    // const [myListData, setMyListData] = useState([]);
    const context = useContext(MyContext);
    const history = useNavigate();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const [formFields, setFormFields] = useState({
        name: "",
        email: "",
        phone: "",
        images: [],
    });
    const [fields, setFields] = useState({
        oldPassword: "",
        password: "",
        confirmPassword: "",
    });
    const formdata = new FormData();
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const changeInput = (e) => {
        setFormFields(() => (
            {
                ...formFields,
                [e.target.name]: e.target.value
            }
        ))
    }
    const changeInput2 = (e) => {
        setFields(() => (
            {
                ...fields,
                [e.target.name]: e.target.value
            }
        ))
    }



    console.log("Final Previews Array:", previews);

    useEffect(() => {
        window.scrollTo(0, 0);


        const token = localStorage.getItem("token");
        if (token !== "" && token !== undefined && token !== null) {
            setIsLogin(true)
        }
        else {
            history("/signIn")
        }

    
        deleteData("/api/imageUpload/deleteAllImages");
        const user = JSON.parse(localStorage.getItem("user"));
        fetchDataFromApi(`api/user?userId=${user?.userId}`).then((res) => {
            const userObj = Array.isArray(res) ? res[0] : res;

            setUserData(userObj);
            setPreviews(userObj.images || []);
            setFormFields({
                name: userObj.name || "",
                email: userObj.email || "",
                phone: userObj.phone || ""
            });
        });
    


    }, []);

    let img_Arr = [];
    let uniqueArray = [];
    let selectedImages = [];
    const onChangeFile = async (e, apiEndPoint) => {
        try {
            setPreviews([]);
            const files = e.target.files;
            setisUploading(true);
            //const fd = new FormData();
            for (var i = 0; i < files.length; i++) {

                //validate file type
                if (files[i] && (files[i].type === 'image/jpeg' || files[i].type === 'image/jpg' || files[i].type === 'image/png')) {
                    setImgFiles(e.target.files)

                    const file = files[i];
                    selectedImages.push(file)
                    formdata.append(`images`, file);
                }
                else {
                    context.setalertBox({
                        open: true,
                        error: true,
                        msg: 'Please select a valid JPG or PNG image file'
                    });
                    return false;
                }

            }

            formFields.images = selectedImages;
            selectedImages.push(selectedImages)

        } catch (error) {
            console.log(error);
        }

        uploadImage(apiEndPoint, formdata).then((res) => {
            console.log(selectedImages)
            fetchDataFromApi("api/imageUpload").then((response) => {
                if (response !== undefined && response !== null && response !== "" && response.length !== 0) {
                    response?.length !== 0 && response?.map((item) => {
                        item?.images.length !== 0 && item?.images?.map((img) => {
                            img_Arr.push(img);

                        })
                    })

                    uniqueArray = img_Arr.filter((item, index) => img_Arr.indexOf(item) === index);

                    setPreviews([]);
                    const appendedArray = [...previews, ...uniqueArray];
                    // const appendedArray = [ ...(Array.isArray(previews) ? previews : []), ...uniqueArray ];
                    setPreviews(uniqueArray);
                    setTimeout(() => {
                        setisUploading(false);
                        img_Arr = [];
                        context.setalertBox({
                            open: true,
                            error: false,
                            msg: "Image Uploaded !"
                        })
                    }, 500)
                }
            });
        });
    }




    const editUser = (e) => {
        e.preventDefault();

        const formdata = new FormData();
        const appendedArray = [...previews, ...uniqueArray];

        formdata.append('name', formFields.name);
        formdata.append('email', formFields.email);
        formdata.append('phone', formFields.phone);
        formdata.append('images', appendedArray);
        formFields.images = appendedArray;



        if (formFields.name !== "" && formFields.email !== "" && formFields.phone !== "" && previews.length !== 0) {
            setIsLoading(true);
            const user = JSON.parse(localStorage.getItem("user"));
            editData(`/api/user/${user?.userId}`, formFields).then(res => {
                setIsLoading(false);
                deleteData("/api/imageUpload/deleteAllImages");
                context.setalertBox({
                    ope: true,
                    error: false,
                    msg: "user updated !"
                });
            });

        }
        else {
            context.setalertBox({
                open: true,
                error: true,
                msg: "Please fill all the fields"
            });
            return false;

        }
    }

    const changePassword = (e) => {
        e.preventDefault();
        formdata.append('password', fields.password);

        if (fields.oldPassword !== "" && fields.password !== "" && fields.confirmPassword !== "") {

            if (fields.password !== fields.confirmPassword) {
                context.setalertBox({
                    open: true,
                    error: true,
                    msg: "Password and confirm password not match!"
                });
            } else {
                const user = JSON.parse(localStorage.getItem("user"));
                const data = {
                    name: user?.name,
                    email: user?.email,
                    password: fields.oldPassword,
                    newPass: fields.password,
                    phone: formFields.phone,
                    images: formFields.images,
                }

                editData(`/api/user/changePassword/${user.userId}`, data).then((res) => {
                    context.setalertBox({
                        open: true,
                        error: false,
                        msg: "Password change successfully !"
                    });
                    setTimeout(() => {
                        window.location.href = "/MyAccount"
                    }, 1500);
                })
                    .catch((err) => {
                        const errMsg = err.response?.data?.msg || "Something went wrong!";
                        context.setalertBox({
                            open: true,
                            error: true,
                            msg: errMsg
                        });
                    });

            }

        } else {
            context.setalertBox({
                open: true,
                error: true,
                msg: "Please fill all the fields"
            });
            return false;

        }
    }



    return (
        <>
            <section className='section'>
                <div className="container myAccountPage">
                    <h2 className='hd'>MY ACCOUNT</h2>
                    <Box sx={{ width: '100%' }} className="myAccBox card  border-0">

                        <Tabs
                            value={value}
                            onChange={handleChange}
                            textColor="inherit"
                            variant="fullWidth"
                        >
                            <Tab label="Edit Profile" {...a11yProps(0)} />
                            <Tab label="Change Password" {...a11yProps(1)} />
                            {/* <Tab label="Other Setting" {...a11yProps(2)} /> */}
                        </Tabs>

                        <TabPanel value={value} index={0} dir={theme.direction}>
                            <form onSubmit={editUser}>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="userImage">
                                            {/* {
                                                previews?.length !== 0 && previews?.map((img, index) => {
                                                    return (
                                                        <img src={img} key={index} alt="userPic" />
                                                    )
                                                })
                                            } */}
                                            {
                                                Array.isArray(previews) && previews.length > 0 ?
                                                    previews.map((img, index) => {
                                                        return (
                                                            <img key={index} src={img} alt={`preview-${index}`} />
                                                        )
                                                    })
                                                    :
                                                    <img src={NoUserImg} alt='no-images' />
                                            }

                                            <div className="overlay d-flex align-items-center justify-content-center">
                                                <FaCloudUploadAlt />
                                                <input type="file" multiple onChange={(e) => onChangeFile(e, '/api/user/upload')} name='images' />
                                            </div>
                                        </div>
                                    </div>



                                    <div className="col-md-8">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <TextField label="Name" variant="outlined" className='w-100' size='small' name="name" onChange={changeInput} value={formFields.name} />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <TextField label="Email" disabled variant="outlined" className='w-100' size='small' name="email" onChange={changeInput} value={formFields.email} />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <TextField label="Phone Number" variant="outlined" className='w-100' size='small' name="phone" onChange={changeInput} value={formFields.phone} />
                                                </div>
                                            </div>

                                        </div>
                                        <div className="form-group">
                                            <Button type='submit' className='btn-blue bg-red btn-lg btn-big btn-round'>&nbsp;Save</Button>
                                        </div>

                                    </div>
                                </div>
                            </form>
                        </TabPanel>
                        <TabPanel value={value} index={1} dir={theme.direction}>
                            <form onSubmit={changePassword}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <TextField label="Old Password" variant="outlined" className='w-100' size='small' name="oldPassword" onChange={changeInput2} />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <TextField label="New Password" variant="outlined" className='w-100' size='small' name="password" onChange={changeInput2} />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <TextField label="Confirm New Password" variant="outlined" className='w-100' size='small' name="confirmPassword" onChange={changeInput2} />
                                                </div>
                                            </div>

                                        </div>
                                        <div className="form-group">
                                            <Button type='submit' className='btn-blue bg-red btn-lg btn-big btn-round'>&nbsp;Save</Button>
                                        </div>

                                    </div>
                                </div>
                            </form>
                        </TabPanel>
                    
                    </Box>
                </div>
            </section>
        </>
    )
}

export default MyAccount;