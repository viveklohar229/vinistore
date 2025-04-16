import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import { useContext, useState } from "react";
import { AiOutlineFullscreen } from "react-icons/ai";
import { GoHeartFill } from "react-icons/go";
import { IoIosHeartEmpty } from "react-icons/io";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Link } from "react-router-dom";
import { MyContext } from "../../App";
import { fetchDataFromApi, postData } from '../../utils/api';


const ProductItem = (props) => {
  const context = useContext(MyContext);

  const [currentImage, setCurrentImage] = useState(0);
  const [imageInterval, setImageInterval] = useState(null);
  const [isAddedToMyList, setIsAddedToMyList] = useState(false);
  // const [myListFields, setMyListFields] = useState(null);

  // Auto swipe images on hover
  const handleMouseEnter = (id) => {
    if (!props.item?.images || props.item.images.length === 0) return;

    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % props.item.images.length; // Loop through images
      setCurrentImage(index);
    }, 800); // Slow transition (800ms)

    setImageInterval(interval);


    const user = JSON.parse(localStorage.getItem("user"))
    fetchDataFromApi(`/api/myList?productId=${id}&userId=${user?.userId}`).then((res) => {
      if (res.length !== 0) {
        setIsAddedToMyList(true)
      }
    })

  };

  const handleMouseLeave = () => {
    if (imageInterval) {
      clearInterval(imageInterval);
      setImageInterval(null);
    }
    setCurrentImage(0);

  };

  const viewProductDetails = (id) => {
    context.setisOpenProductModal({
      id: id,
      open: true
    });
  };


  const addToMyList = async (id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user !== undefined && user !== null && user !== "") {
      const data = {
        productTitle: props?.item?.name,
        images: props?.item?.images[0],
        rating: props?.item?.rating,
        price: props?.item?.price,
        productId: id,
        userId: user?.userId
      }
      postData(`/api/myList/add`, data).then((res) => {

        if (res.status && res.status !== false) {
          context.setalertBox({
            open: true,
            error: false,
            msg: res.msg || "The product added in my list!"
          });
          fetchDataFromApi(`/api/myList?productId=${id}&userId=${user?.userId}`).then((res) => {
            if (res.length !== 0) {
              setIsAddedToMyList(true)
            }
          })
        } else {
          context.setalertBox({
            open: true,
            error: true,
            msg: res.msg || "Product already added in the my list"
          });
        }

      })
    } else {
      context.setalertBox({
        open: true,
        error: true,
        msg: "Please Login to continue !"
      });
    }
  }


  return (
    <>
      <div
        className={`card productItem ${props.itemView} `}
        onMouseEnter={() => handleMouseEnter(props.itemView === 'recentlyView' ? props.item?.prodId : props.item?.id)}
        onMouseLeave={handleMouseLeave}
      >
        <div className="imgWrapper">
          <Link to={`/product/${props.itemView === 'recentlyView' ? props.item?.prodId : props.item?.id}`}>
            <LazyLoadImage
              alt={props.item?.name}
              src={props.item?.images[currentImage]} // Image changes on hover
              effect="blur" // Lazy load effect
              className="productImage w-100"
            />
          </Link>
          <span className="badge badge-primary">{props.item?.discount}%</span>

          <div className="actions">
            <Button onClick={() => viewProductDetails(props?.itemView === 'recentlyView' ? props.item?.prodId : props.item?.id)}>
              <AiOutlineFullscreen />
            </Button>

            <Button className={isAddedToMyList === true && 'active'} onClick={() => addToMyList(props?.itemView === 'recentlyView' ? props.item?.prodId : props.item?.id)}>
              {
                isAddedToMyList === true ? <GoHeartFill style={{ fontSize: "20px" }} /> : <IoIosHeartEmpty style={{ fontSize: "20px" }} />
              }
            </Button>
          </div>
        </div>
        <div className="info">
          <Link to={`/product/${props?.itemView === 'recentlyView' ? props.item?.prodId : props.item?.id}`}>
            <h4>{props.item?.name?.substr(0, 40) + "..."}</h4>
          </Link>
          <span className="text-success d-block">In Stock</span>
          <Rating
            className="rating"
            name="read-only"
            value={props.item?.rating}
            readOnly
            size="small"
            precision={0.5}
          />
          <div className="d-flex">
            <span className="oldPrice ">Rs{props.item?.oldPrice}</span>
            <span className="netPrice text-danger ">Rs{props.item?.price}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductItem;
