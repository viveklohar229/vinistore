import { AiFillProduct } from "react-icons/ai";
import { LiaShippingFastSolid } from "react-icons/lia";
import { RiDiscountPercentLine } from "react-icons/ri";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";




const Footer = () => {
    return (
        <footer>
            
            <div className="container">
                <div className="topInfo row">
                    <div className="col d-flex align-items-center gap-2">
                        <span><AiFillProduct></AiFillProduct></span>
                        <span>Everyday fresh products</span>

                    </div>
                    <div className="col d-flex align-items-center  gap-2">
                        <span><LiaShippingFastSolid></LiaShippingFastSolid></span>
                        <span>Free delivery  for order over $70</span>

                    </div>
                    <div className="col d-flex align-items-center  gap-2">
                        <span><RiDiscountPercentLine></RiDiscountPercentLine></span>
                        <span>Daily mega Discounts</span>

                    </div>
                    <div className="col d-flex align-items-center  gap-2">
                        <span><RiMoneyRupeeCircleLine></RiMoneyRupeeCircleLine></span>
                        <span>Best price on the market</span>

                    </div>

                </div>


                <div className="row  linksWrap">
                    <div className="col">
                        <h5>FRUITS & VEGETABLES</h5>
                        <ul>
                            <li><Link to="#">Fresh Vegetables</Link></li>
                            <li><Link to="#">Herbs & Seasonings</Link></li>
                            <li><Link to="#">Fresh Fruits</Link></li>
                            <li><Link to="#">Cuts & Sprouts</Link></li>
                            <li><Link to="#">Exotic Fruits & Veggies</Link></li>
                            <li><Link to="#">Packaged Produce</Link></li>
                            <li><Link to="#">Party Trays</Link></li>
                        </ul>

                    </div>
                    <div className="col">
                        <h5>Breakfast & Dairy</h5>
                        <ul>
                            <li><Link to="#">Milk & Flavoured Milk</Link></li>
                            <li><Link to="#">Butter and Margarine</Link></li>
                            <li><Link to="#">Cheese</Link></li>
                            <li><Link to="#">Eggs Substitutes</Link></li>
                            <li><Link to="#">Honey</Link></li>
                            <li><Link to="#">Marmalades</Link></li>
                            <li><Link to="#">Party Trays</Link></li>
                            <li><Link to="#">Yogurt</Link></li>
                        </ul>

                    </div>
                    <div className="col">
                        <h5>Meat & Seafood</h5>
                        <ul>
                            <li><Link to="#">Breakfast Sausage</Link></li>
                            <li><Link to="#">Dinner Sausage</Link></li>
                            <li><Link to="#">Beef</Link></li>
                            <li><Link to="#">Chicken</Link></li>
                            <li><Link to="#">Sliced Deli Meat</Link></li>
                            <li><Link to="#">Shrimp</Link></li>
                            <li><Link to="#">Wild Caught Fillets</Link></li>
                            <li><Link to="#">Crab and Shellfish</Link></li>
                            <li><Link to="#">Farm Raised Fillets</Link></li>
                        </ul>

                    </div>
                    <div className="col">
                        <h5>Beverages</h5>
                        <ul>
                            <li><Link to="#">Water</Link></li>
                            <li><Link to="#">Sparkling Water</Link></li>
                            <li><Link to="#">Soda & Pop</Link></li>
                            <li><Link to="#">Coffee</Link></li>
                            <li><Link to="#">Milk & Plant-Based Milk</Link></li>
                            <li><Link to="#">Tea & Kombucha</Link></li>
                            <li><Link to="#">Drink Boxes & Pouches</Link></li>
                            <li><Link to="#">Craft Beer</Link></li>
                            <li><Link to="#">Wine</Link></li>
                        </ul>

                    </div>
                    <div className="col">
                        <h5>Breakfast & Dairy</h5>
                        <ul>
                            <li><Link to="#">Milk & Flavoured Milk</Link></li>
                            <li><Link to="#">Butter and Margarine</Link></li>
                            <li><Link to="#">Cheese</Link></li>
                            <li><Link to="#">Eggs Substitutes</Link></li>
                            <li><Link to="#">Honey</Link></li>
                            <li><Link to="#">Marmalades</Link></li>
                            <li><Link to="#">Party Trays</Link></li>
                            <li><Link to="#">Yogurt</Link></li>
                        </ul>

                    </div>

                </div>


                <div className="copyright mt-lg-5 pt-3 pb-4 d-flex" >
                    <p className="mb-0">© All Rights Reserved by ♥ VINI Developer.</p>
                    <ul className="list list-inline mb-0 socials">
                        <li className="list-inline-item">
                            <Link to="#"><FaFacebookF></FaFacebookF></Link>
                        </li>
                        <li className="list-inline-item">
                            <Link to="#"><FaTwitter></FaTwitter></Link>
                        </li>
                        <li className="list-inline-item">
                            <Link to="#"><FaInstagram></FaInstagram></Link>
                        </li>
                    </ul>


                </div>
            </div>
        </footer>
    )
}

export default Footer;